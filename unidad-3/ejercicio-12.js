class ModelEj12 extends EventTarget
{
    constructor()
    {
        super();
        this._figuras  = [];
        this._lineWidth = 1;
        this._lineCap   = 'butt';
    }

    agregarFigura(figura)
    {
        figura.lineWidth = this._lineWidth;
        figura.lineCap   = this._lineCap;
        this._figuras.push(figura);
        this.changed();
    }

    limpiar()
    {
        this._figuras = [];
        this.changed();
    }

    setLineWidth(v) { this._lineWidth = v; }
    setLineCap(v)   { this._lineCap   = v; }
    getFiguras()    { return this._figuras; }

    changed()
    {
        this.dispatchEvent(new CustomEvent('changed'));
    }
}

class ViewEj12 extends View
{
    constructor()
    {
        super();

        this._btnCargar  = document.createElement('button');
        this._btnLimpiar = document.createElement('button');
        this._btnCargar.innerText  = 'Cargar';
        this._btnLimpiar.innerText = 'Limpiar';

        this._inputGrosor = document.createElement('input');
        this._inputGrosor.type  = 'number';
        this._inputGrosor.value = '1';
        this._inputGrosor.min   = '1';
        this._inputGrosor.max   = '20';

        this._selectCap = document.createElement('select');
        let opciones = ['butt', 'round', 'square'];
        for (let i = 0; i < opciones.length; i++)
        {
            let opt = document.createElement('option');
            opt.value     = opciones[i];
            opt.innerText = opciones[i];
            this._selectCap.appendChild(opt);
        }

        this.appendChild(this._btnCargar);
        this.appendChild(this._btnLimpiar);
        this.appendChild(this._inputGrosor);
        this.appendChild(this._selectCap);
    }

    getGrosor() { return parseInt(this._inputGrosor.value); }
    getCap()    { return this._selectCap.value; }

    onCargar()
    {
        this.dispatchEvent(new CustomEvent('request', { detail: 'cargar' }));
    }

    onLimpiar()
    {
        this.dispatchEvent(new CustomEvent('request', { detail: 'limpiar' }));
    }

    connectedCallback()
    {
        this._btnCargar.onclick  = this.onCargar.bind(this);
        this._btnLimpiar.onclick = this.onLimpiar.bind(this);
    }

    disconnectedCallback()
    {
        this._btnCargar.onclick  = null;
        this._btnLimpiar.onclick = null;
    }
}

customElements.define('x-view-ej12', ViewEj12);

class ControllerEj12
{
    constructor(view, model)
    {
        this._view  = view;
        this._model = model;
        this._onRequest      = this.onRequest.bind(this);
        this._onModelChanged = this.onModelChanged.bind(this);
    }

    enable()
    {
        this._view.addEventListener('request', this._onRequest);
        this._model.addEventListener('changed', this._onModelChanged);
    }

    disable()
    {
        this._view.removeEventListener('request', this._onRequest);
        this._model.removeEventListener('changed', this._onModelChanged);
    }

    onRequest(event)
    {
        if (event.detail === 'cargar')
        {
            this._model.setLineWidth(this._view.getGrosor());
            this._model.setLineCap(this._view.getCap());

            let json   = prompt('Ingrese la figura en formato JSON:');
            let figura = JSON.parse(json);
            this._model.agregarFigura(figura);
        }
        if (event.detail === 'limpiar')
        {
            this._model.limpiar();
        }
    }

    onModelChanged()
    {
        let figuras = this._model.getFiguras();
        this._view.render( (canvas) =>
        {
            let ctx = canvas.getContext('2d');
            for (let i = 0; i < figuras.length; i++)
            {
                let f = figuras[i];
                ctx.lineWidth = f.lineWidth;
                ctx.lineCap   = f.lineCap;

                if (f.tipo === 'circulo')
                {
                    ctx.beginPath();
                    ctx.arc(f.x, f.y, f.radio, 0, Math.PI * 2);
                    ctx.stroke();
                }
                if (f.tipo === 'poligono')
                {
                    ctx.beginPath();
                    ctx.moveTo(f.puntos[0].x, f.puntos[0].y);
                    for (let j = 1; j < f.puntos.length; j++)
                    {
                        ctx.lineTo(f.puntos[j].x, f.puntos[j].y);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        });
    }
}

function mainEj12()
{
    let model = new ModelEj12();
    let view  = new ViewEj12();
    let ctrl  = new ControllerEj12(view, model);
    ctrl.enable();
    document.body.appendChild(view);
}