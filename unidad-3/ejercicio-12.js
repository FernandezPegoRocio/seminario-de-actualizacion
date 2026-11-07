const EJEMPLOS_EJ12 = 'Cargue una sola figura por vez. Ejemplos:\n' +
    '{ "tipo": "circulo", "x": 100, "y": 150, "radio": 40 }\n' +
    '{ "tipo": "poligono", "puntos": [[50,50],[150,50],[100,150]] }';

function normalizarFiguraEj12(figura)
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

function figuraValidaEj12(figura)
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

function interpretarFiguraEj12(json)
{
    let figura;

    try
    {
        figura = JSON.parse(json);
    }
    catch (error)
    {
        alert('El texto no es un JSON válido.\n' + EJEMPLOS_EJ12);
        return null;
    }

    if (figura === null || typeof figura !== 'object')
    {
        alert('El JSON no describe una figura.\n' + EJEMPLOS_EJ12);
        return null;
    }

    normalizarFiguraEj12(figura);

    if (!figuraValidaEj12(figura))
    {
        alert('A la figura le faltan datos o tienen un formato incorrecto.\n' + EJEMPLOS_EJ12);
        return null;
    }

    return figura;
}

function crearEtiquetaEj12(texto, control)
{
    let etiqueta = document.createElement('label');
    etiqueta.innerText = texto + ': ';
    etiqueta.style.marginLeft = '10px';
    etiqueta.appendChild(control);

    return etiqueta;
}

function patronLineaEj12(tipoLinea)
{
    if (tipoLinea === 'punteada')
    {
        return [2, 6];
    }

    if (tipoLinea === 'rayada')
    {
        return [14, 8];
    }

    return [];
}

class ModelEj12 extends EventTarget
{
    constructor()
    {
        super();
        this._figuras  = [];
        this._lineWidth = 1;
        this._tipoLinea = 'solida';
    }

    agregarFigura(figura)
    {
        figura.lineWidth = this._lineWidth;
        figura.tipoLinea = this._tipoLinea;
        this._figuras.push(figura);
        this.changed();
    }

    limpiar()
    {
        this._figuras = [];
        this.changed();
    }

    setLineWidth(v) { this._lineWidth = v; }
    setTipoLinea(v) { this._tipoLinea = v; }
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

        this._selectTipoLinea = document.createElement('select');
        let opciones = ['solida', 'punteada', 'rayada'];
        for (let i = 0; i < opciones.length; i++)
        {
            let opt = document.createElement('option');
            opt.value     = opciones[i];
            opt.innerText = opciones[i];
            this._selectTipoLinea.appendChild(opt);
        }

        let controles = document.createElement('div');
        controles.style.marginBottom = '10px';
        controles.appendChild(this._btnCargar);
        controles.appendChild(this._btnLimpiar);
        controles.appendChild(crearEtiquetaEj12('Grosor', this._inputGrosor));
        controles.appendChild(crearEtiquetaEj12('Tipo de línea', this._selectTipoLinea));
        this.insertBefore(controles, this._canvas);
    }

    getGrosor() { return parseInt(this._inputGrosor.value); }
    getTipoLinea()    { return this._selectTipoLinea.value; }

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
            this._model.setTipoLinea(this._view.getTipoLinea());

            let json = prompt('Ingrese la figura en formato JSON:', '{ "tipo": "circulo", "x": 400, "y": 300, "radio": 100 }');

            if (json === null || json.trim() === '')
            {
                return;
            }

            let figura = interpretarFiguraEj12(json);

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
                ctx.lineWidth = f.lineWidth;
                ctx.setLineDash(patronLineaEj12(f.tipoLinea));

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

function mainEj12() {
    let model = new ModelEj12();
    let view  = new ViewEj12();
    let ctrl  = new ControllerEj12(view, model);
    ctrl.enable();
    document.getElementById('app').appendChild(view);
}