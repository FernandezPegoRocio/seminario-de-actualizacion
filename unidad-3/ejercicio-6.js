function dibujarFigurasEj6(canvas, figuras)
{
    let ctx = canvas.getContext('2d');

    for (let i = 0; i < figuras.length; i++)
    {
        let figura = figuras[i];

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
}

class ModelEj6 extends EventTarget
{
    constructor()
    {
        super();
        this._figuras = [];
    }

    agregarFigura(figura)
    {
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

class ViewEj6 extends View
{
    constructor()
    {
        super();

        this._botonCargar = document.createElement('button');
        this._botonCargar.innerText = 'Cargar';

        this._botonLimpiar = document.createElement('button');
        this._botonLimpiar.innerText = 'Limpiar';

        this.appendChild(this._botonCargar);
        this.appendChild(this._botonLimpiar);
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
    }

    disconnectedCallback()
    {
        this._botonCargar.onclick = null;
        this._botonLimpiar.onclick = null;
    }
}

customElements.define('x-view-ej6', ViewEj6);

class ControllerEj6
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
            dibujarFigurasEj6(canvas, figuras);
        });
    }

    onViewRequest(event)
    {
        if (event.detail === 'cargar')
        {
            let json = prompt('Ingrese la figura en JSON. Ejemplos: {"tipo":"circulo","x":100,"y":100,"radio":50} o {"tipo":"poligono","puntos":[[300,50],[400,50],[350,150]]}');

            if (json !== null && json !== '')
            {
                this._model.agregarFigura(JSON.parse(json));
            }
        }

        if (event.detail === 'limpiar')
        {
            this._model.limpiar();
        }
    }
}

function mainEj6()
{
    let model = new ModelEj6();
    let view = new ViewEj6();
    let controller = new ControllerEj6(view, model);
    controller.enable();
    document.getElementById('app').appendChild(view);
}
