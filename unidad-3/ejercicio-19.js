const EJEMPLOS_EJ19 = 'Cargue una sola figura por vez. Ejemplos:\n' +
    '{ "tipo": "circulo", "x": 100, "y": 150, "radio": 40 }\n' +
    '{ "tipo": "poligono", "puntos": [[50,50],[150,50],[100,150]] }\n' +
    '{ "tipo": "cakegraph", "data": [0.4, 0.3, 0.2, 0.1] }\n' +
    '{ "tipo": "cakegraph", "porciones": [{ "valor": 0.3, "etiqueta": "A" }, { "valor": 0.7, "etiqueta": "B" }] }';

function ejemploJsonEj19(tipo)
{
    if (tipo === 'poligono')
    {
        return '{ "puntos": [[300,150],[500,150],[400,350]] }';
    }

    if (tipo === 'cakegraph')
    {
        return '{ "data": [0.4, 0.3, 0.2, 0.1] }';
    }

    return '{ "x": 400, "y": 300, "radio": 100 }';
}

function ajustarPorcionesEj19(figura)
{
    let total = 0;

    for (let i = 0; i < figura.porciones.length; i++)
    {
        total += figura.porciones[i].valor;
    }

    for (let i = 0; i < figura.porciones.length; i++)
    {
        figura.porciones[i].valor = figura.porciones[i].valor / total;

        if (figura.porciones[i].etiqueta === undefined)
        {
            figura.porciones[i].etiqueta = '';
        }
    }
}

function normalizarFiguraEj19(figura)
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

    let valores = figura.data;

    if (valores === undefined)
    {
        valores = figura.datos;
    }

    if (figura.porciones === undefined && Array.isArray(valores))
    {
        figura.porciones = [];

        for (let i = 0; i < valores.length; i++)
        {
            figura.porciones.push({ valor: valores[i] });
        }
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

function figuraValidaEj19(figura)
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

    if (figura.tipo === 'cakegraph')
    {
        if (!Array.isArray(figura.porciones) || figura.porciones.length === 0)
        {
            return false;
        }

        let total = 0;

        for (let i = 0; i < figura.porciones.length; i++)
        {
            let porcion = figura.porciones[i];

            if (porcion === null || !Number.isFinite(porcion.valor) || porcion.valor < 0)
            {
                return false;
            }

            total += porcion.valor;
        }

        return total > 0;
    }

    return false;
}

function interpretarFiguraEj19(json, tipoSeleccionado)
{
    let figura;

    try
    {
        figura = JSON.parse(json);
    }
    catch (error)
    {
        alert('El texto no es un JSON válido.\n' + EJEMPLOS_EJ19);
        return null;
    }

    if (figura === null || typeof figura !== 'object')
    {
        alert('El JSON no describe una figura.\n' + EJEMPLOS_EJ19);
        return null;
    }

    normalizarFiguraEj19(figura);

    if (figura.tipo === undefined)
    {
        figura.tipo = tipoSeleccionado;
    }

    if (!figuraValidaEj19(figura))
    {
        alert('A la figura le faltan datos o tienen un formato incorrecto.\n' + EJEMPLOS_EJ19);
        return null;
    }

    if (figura.tipo === 'cakegraph')
    {
        ajustarPorcionesEj19(figura);
    }

    return figura;
}

function colorAleatorioEj19()
{
    let rojo  = 100 + Math.floor(Math.random() * 156);
    let verde = 100 + Math.floor(Math.random() * 156);
    let azul  = 100 + Math.floor(Math.random() * 156);

    return 'rgb(' + rojo + ',' + verde + ',' + azul + ')';
}

function crearEtiquetaEj19(texto, control)
{
    let etiqueta = document.createElement('label');
    etiqueta.innerText = texto + ': ';
    etiqueta.style.marginLeft = '10px';
    etiqueta.appendChild(control);

    return etiqueta;
}

function patronLineaEj19(tipoLinea)
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

class ModelEj19 extends EventTarget
{
    constructor()
    {
        super();
        this._figuras = [];
        this._lineWidth = 1;
        this._tipoLinea = 'solida';
    }

    agregarFigura(figura)
    {
        figura.lineWidth = this._lineWidth;
        figura.tipoLinea = this._tipoLinea;

        if (figura.tipo === 'cakegraph')
        {
            for (let i = 0; i < figura.porciones.length; i++)
            {
                figura.porciones[i].color = colorAleatorioEj19();
            }
        }

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

class ViewEj19 extends View
{
    constructor()
    {
        super();

        this._selectTipo = document.createElement('select');
        let opciones = ['circulo', 'poligono', 'cakegraph'];

        for (let i = 0; i < opciones.length; i++)
        {
            let opt = document.createElement('option');
            opt.value = opciones[i];
            opt.innerText = opciones[i];
            this._selectTipo.appendChild(opt);
        }

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
        let caps = ['solida', 'punteada', 'rayada'];

        for (let i = 0; i < caps.length; i++)
        {
            let opt = document.createElement('option');
            opt.value = caps[i];
            opt.innerText = caps[i];
            this._selectTipoLinea.appendChild(opt);
        }

        let controles = document.createElement('div');
        controles.style.marginBottom = '10px';
        controles.appendChild(crearEtiquetaEj19('Figura', this._selectTipo));
        controles.appendChild(this._btnCargar);
        controles.appendChild(this._btnLimpiar);
        controles.appendChild(crearEtiquetaEj19('Grosor', this._inputGrosor));
        controles.appendChild(crearEtiquetaEj19('Tipo de línea', this._selectTipoLinea));
        this.insertBefore(controles, this._canvas);
    }

    getTipo()   { return this._selectTipo.value; }
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

customElements.define('x-view-ej19', ViewEj19);

class ControllerEj19
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

            let json = prompt('Ingrese la figura en formato JSON:', ejemploJsonEj19(this._view.getTipo()));

            if (json === null || json.trim() === '')
            {
                return;
            }

            let figura = interpretarFiguraEj19(json, this._view.getTipo());

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
                ctx.setLineDash(patronLineaEj19(f.tipoLinea));

                if (f.tipo === 'circulo')
                {
                    ctx.beginPath();
                    ctx.arc(f.x, f.y, f.radio, 0, Math.PI * 2);
                    ctx.closePath();
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

                if (f.tipo === 'cakegraph')
                {
                    let porciones    = f.porciones;
                    let centroX      = canvas.width  / 2;
                    let centroY      = canvas.height / 2;
                    let radio        = 200;

                    if (f.x !== undefined)
                    {
                        centroX = f.x;
                    }

                    if (f.y !== undefined)
                    {
                        centroY = f.y;
                    }

                    if (f.radio !== undefined)
                    {
                        radio = f.radio;
                    }

                    let anguloActual = 0;

                    for (let j = 0; j < porciones.length; j++)
                    {
                        let porcion     = porciones[j].valor;
                        let anguloFinal = anguloActual + (porcion * Math.PI * 2);

                        ctx.beginPath();
                        ctx.moveTo(centroX, centroY);
                        ctx.arc(centroX, centroY, radio, anguloActual, anguloFinal);
                        ctx.closePath();
                        ctx.fillStyle = porciones[j].color;
                        ctx.fill();
                        ctx.stroke();

                        let anguloMedio = anguloActual + (porcion * Math.PI);
                        let textoX = centroX + (radio / 2) * Math.cos(anguloMedio);
                        let textoY = centroY + (radio / 2) * Math.sin(anguloMedio);

                        ctx.fillStyle = 'black';
                        ctx.font = '18px sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(porciones[j].etiqueta + ' ' + Math.round(porcion * 100) + '%', textoX, textoY);

                        anguloActual = anguloFinal;
                    }
                }
            }
        });
    }
}

function mainEj19()
{
    let model = new ModelEj19();
    let view  = new ViewEj19();
    let ctrl  = new ControllerEj19(view, model);
    ctrl.enable();
    document.getElementById('app').appendChild(view);
}
