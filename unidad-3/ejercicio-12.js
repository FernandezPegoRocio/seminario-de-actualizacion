const TIPOS_LINEA_EJ12 = ['sólida', 'punteada', 'rayada'];
const PATRONES_LINEA_EJ12 = [[], [2, 6], [14, 8]];

function dibujarFigurasEj12(canvas, figuras)
{
    let ctx = canvas.getContext('2d');

    for (let i = 0; i < figuras.length; i++)
    {
        let figura = figuras[i];

        ctx.lineWidth = figura.grosor;
        ctx.setLineDash(PATRONES_LINEA_EJ12[figura.tipoLinea]);
        ctx.beginPath();

        if (figura.tipo === 'circulo')
        {
            ctx.arc(figura.x, figura.y, figura.radio, 0, Math.PI * 2);
        }

        if (figura.tipo === 'poligono')
        {
            ctx.moveTo(figura.puntos[0][0], figura.puntos[0][1]);

            for (let j = 1; j < figura.puntos.length; j++)
            {
                ctx.lineTo(figura.puntos[j][0], figura.puntos[j][1]);
            }
        }

        ctx.closePath();
        ctx.stroke();
    }

    ctx.setLineDash([]);
}

class ModelEj12 extends EventTarget
{
    constructor()
    {
        super();
        this._figuras = [];
    }

    agregarFigura(figura, grosor, tipoLinea)
    {
        figura.grosor = grosor;
        figura.tipoLinea = tipoLinea;
        this._figuras[this._figuras.length] = figura;
        this.changed();
    }

    limpiar()
    {
        this._figuras = [];
        this.changed();
    }

    obtenerFiguras()
    {
        return this._figuras;
    }

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

        this._tipoLinea = 0;

        this._botonCargar = document.createElement('button');
        this._botonCargar.innerText = 'Cargar';

        this._botonLimpiar = document.createElement('button');
        this._botonLimpiar.innerText = 'Limpiar';

        this._campoGrosor = document.createElement('input');
        this._campoGrosor.type = 'text';
        this._campoGrosor.placeholder = 'Grosor';
        this._campoGrosor.value = '1';

        this._botonLinea = document.createElement('button');

        this.appendChild(this._botonCargar);
        this.appendChild(this._botonLimpiar);
        this.appendChild(this._campoGrosor);
        this.appendChild(this._botonLinea);

        this._mostrarTipoLinea();
    }

    get grosor()
    {
        return parseInt(this._campoGrosor.value);
    }

    get tipoLinea()
    {
        return this._tipoLinea;
    }

    _mostrarTipoLinea()
    {
        this._botonLinea.innerText = 'Línea: ' + TIPOS_LINEA_EJ12[this._tipoLinea];
    }

    _onCambiarLinea()
    {
        this._tipoLinea = (this._tipoLinea + 1) % TIPOS_LINEA_EJ12.length;
        this._mostrarTipoLinea();
    }

    _onCargar()
    {
        this.dispatchEvent(new CustomEvent('request', { detail: 'cargar' }));
    }

    _onLimpiar()
    {
        this.dispatchEvent(new CustomEvent('request', { detail: 'limpiar' }));
    }

    connectedCallback()
    {
        this._botonCargar.onclick = this._onCargar.bind(this);
        this._botonLimpiar.onclick = this._onLimpiar.bind(this);
        this._botonLinea.onclick = this._onCambiarLinea.bind(this);
    }

    disconnectedCallback()
    {
        this._botonCargar.onclick = null;
        this._botonLimpiar.onclick = null;
        this._botonLinea.onclick = null;
    }
}

customElements.define('x-view-ej12', ViewEj12);

class ControllerEj12
{
    constructor(view, model)
    {
        this._view = view;
        this._model = model;
        this._onModelChanged = this.onModelChanged.bind(this);
        this._onViewRequest = this.onViewRequest.bind(this);
    }

    enable()
    {
        this._model.addEventListener('changed', this._onModelChanged);
        this._view.addEventListener('request', this._onViewRequest);
    }

    disable()
    {
        this._model.removeEventListener('changed', this._onModelChanged);
        this._view.removeEventListener('request', this._onViewRequest);
    }

    onModelChanged()
    {
        let figuras = this._model.obtenerFiguras();

        this._view.render(function(canvas)
        {
            dibujarFigurasEj12(canvas, figuras);
        });
    }

    onViewRequest(event)
    {
        if (event.detail === 'cargar')
        {
            let json = prompt('Ingrese la figura en JSON. Ejemplos: {"tipo":"circulo","x":100,"y":100,"radio":50} o {"tipo":"poligono","puntos":[[300,50],[400,50],[350,150]]}');

            if (json !== null && json !== '')
            {
                this._model.agregarFigura(JSON.parse(json), this._view.grosor, this._view.tipoLinea);
            }
        }

        if (event.detail === 'limpiar')
        {
            this._model.limpiar();
        }
    }
}

function mainEj12()
{
    let model = new ModelEj12();
    let view = new ViewEj12();
    let controller = new ControllerEj12(view, model);
    controller.enable();
    document.getElementById('app').appendChild(view);
}
