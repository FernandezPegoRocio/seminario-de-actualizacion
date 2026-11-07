const EJEMPLOS_EJ6 = 'Cargue una sola figura por vez. Ejemplos:\n' +
    '{ "tipo": "circulo", "x": 100, "y": 150, "radio": 40 }\n' +
    '{ "tipo": "poligono", "puntos": [[50,50],[150,50],[100,150]] }';

function normalizarFiguraEj6(figura)
{
    if (figura.tipo === undefined)
    {
        figura.tipo = figura.type;
    }

    if (figura.tipo === 'circle')
    {
        figura.tipo = 'circulo';
    }

    if (figura.tipo === 'polygon')
    {
        figura.tipo = 'poligono';
    }

    if (figura.radio === undefined)
    {
        figura.radio = figura.r;
    }

    if (figura.radio === undefined)
    {
        figura.radio = figura.radius;
    }

    if (figura.puntos === undefined)
    {
        figura.puntos = figura.points;
    }

    if (Array.isArray(figura.puntos))
    {
        for (let i = 0; i < figura.puntos.length; i++)
        {
            let punto = figura.puntos[i];

            if (Array.isArray(punto))
            {
                figura.puntos[i] = { x: punto[0], y: punto[1] };
            }
        }
    }
}

function figuraValidaEj6(figura)
{
    if (figura.tipo === 'circulo')
    {
        return Number.isFinite(figura.x) && Number.isFinite(figura.y) && Number.isFinite(figura.radio);
    }

    if (figura.tipo === 'poligono')
    {
        if (!Array.isArray(figura.puntos) || figura.puntos.length < 3)
        {
            return false;
        }

        for (let i = 0; i < figura.puntos.length; i++)
        {
            let punto = figura.puntos[i];

            if (punto === null || !Number.isFinite(punto.x) || !Number.isFinite(punto.y))
            {
                return false;
            }
        }

        return true;
    }

    return false;
}

function interpretarFiguraEj6(json)
{
    let figura;

    try
    {
        figura = JSON.parse(json);
    }
    catch (error)
    {
        alert('El texto no es un JSON válido.\n' + EJEMPLOS_EJ6);
        return null;
    }

    if (figura === null || typeof figura !== 'object')
    {
        alert('El JSON no describe una figura.\n' + EJEMPLOS_EJ6);
        return null;
    }

    normalizarFiguraEj6(figura);

    if (!figuraValidaEj6(figura))
    {
        alert('A la figura le faltan datos o tienen un formato incorrecto.\n' + EJEMPLOS_EJ6);
        return null;
    }

    return figura;
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
        this._figuras.push(figura);
        this.changed();
    }

    limpiar()
    {
        this._figuras = [];
        this.changed();
    }

    getFiguras()
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
        this._btnCargar  = document.createElement('button');
        this._btnLimpiar = document.createElement('button');
        this._btnCargar.innerText  = 'Cargar';
        this._btnLimpiar.innerText = 'Limpiar';
        let controles = document.createElement('div');
        controles.style.marginBottom = '10px';
        controles.appendChild(this._btnCargar);
        controles.appendChild(this._btnLimpiar);
        this.insertBefore(controles, this._canvas);
    }

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

customElements.define('x-view-ej6', ViewEj6);

class ControllerEj6
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
            let json = prompt('Ingrese la figura en formato JSON:', '{ "tipo": "circulo", "x": 400, "y": 300, "radio": 100 }');

            if (json === null || json.trim() === '')
            {
                return;
            }

            let figura = interpretarFiguraEj6(json);

            if (figura !== null)
            {
                this._model.agregarFigura(figura);
            }
        }
        if (event.detail === 'limpiar')
        {
            this._model.limpiar();
        }
    }

    onModelChanged()
    {
        let figuras = this._model.getFiguras();
        this._view.render(function(canvas)
        {
            let ctx = canvas.getContext('2d');
            for (let i = 0; i < figuras.length; i++)
            {
                let f = figuras[i];
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

function mainEj6() {
    let model = new ModelEj6();
    let view  = new ViewEj6();
    let ctrl  = new ControllerEj6(view, model);
    ctrl.enable();
    document.getElementById('app').appendChild(view);
}