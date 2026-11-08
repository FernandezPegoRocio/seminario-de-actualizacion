const TIPOS_FIGURA_EJ19 = ['circulo', 'poligono', 'cakegraph'];
const TIPOS_LINEA_EJ19 = ['sólida', 'punteada', 'rayada'];
const PATRONES_LINEA_EJ19 = [[], [2, 6], [14, 8]];

function colorAleatorioEj19()
{
    let rojo = 100 + parseInt(Math.random() * 156);
    let verde = 100 + parseInt(Math.random() * 156);
    let azul = 100 + parseInt(Math.random() * 156);

    return 'rgb(' + rojo + ',' + verde + ',' + azul + ')';
}

function ejemploJsonEj19(tipo)
{
    if (tipo === 'poligono')
    {
        return '{"puntos":[[300,50],[400,50],[350,150]]}';
    }

    if (tipo === 'cakegraph')
    {
        return '{"porciones":[{"valor":0.3,"etiqueta":"A"},{"valor":0.7,"etiqueta":"B"}]}';
    }

    return '{"x":100,"y":100,"radio":50}';
}

function dibujarTortaEj19(ctx, canvas, porciones)
{
    let centroX = canvas.width / 2;
    let centroY = canvas.height / 2;
    let radio = 200;
    let anguloInicio = 0;

    for (let j = 0; j < porciones.length; j++)
    {
        let anguloFin = anguloInicio + porciones[j].valor * Math.PI * 2;
        let anguloMedio = anguloInicio + porciones[j].valor * Math.PI;

        ctx.beginPath();
        ctx.moveTo(centroX, centroY);
        ctx.arc(centroX, centroY, radio, anguloInicio, anguloFin);
        ctx.closePath();
        ctx.fillStyle = porciones[j].color;
        ctx.fill();
        ctx.stroke();

        let textoX = centroX + (radio / 2) * Math.cos(anguloMedio);
        let textoY = centroY + (radio / 2) * Math.sin(anguloMedio);

        ctx.fillStyle = 'black';
        ctx.fillText(porciones[j].etiqueta + ' ' + parseInt(porciones[j].valor * 100) + '%', textoX, textoY);

        anguloInicio = anguloFin;
    }
}

function dibujarFigurasEj19(canvas, figuras)
{
    let ctx = canvas.getContext('2d');

    for (let i = 0; i < figuras.length; i++)
    {
        let figura = figuras[i];

        ctx.lineWidth = figura.grosor;
        ctx.setLineDash(PATRONES_LINEA_EJ19[figura.tipoLinea]);

        if (figura.tipo === 'cakegraph')
        {
            dibujarTortaEj19(ctx, canvas, figura.porciones);
        }

        if (figura.tipo === 'circulo')
        {
            ctx.beginPath();
            ctx.arc(figura.x, figura.y, figura.radio, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
        }

        if (figura.tipo === 'poligono')
        {
            ctx.beginPath();
            ctx.moveTo(figura.puntos[0][0], figura.puntos[0][1]);

            for (let j = 1; j < figura.puntos.length; j++)
            {
                ctx.lineTo(figura.puntos[j][0], figura.puntos[j][1]);
            }

            ctx.closePath();
            ctx.stroke();
        }
    }

    ctx.setLineDash([]);
}

class ModelEj19 extends EventTarget
{
    constructor()
    {
        super();
        this._figuras = [];
    }

    agregarFigura(figura, tipo, grosor, tipoLinea)
    {
        figura.tipo = tipo;
        figura.grosor = grosor;
        figura.tipoLinea = tipoLinea;

        if (tipo === 'cakegraph')
        {
            for (let i = 0; i < figura.porciones.length; i++)
            {
                figura.porciones[i].color = colorAleatorioEj19();
            }
        }

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

class ViewEj19 extends View
{
    constructor()
    {
        super();

        this._tipoLinea = 0;

        this._selectorFigura = document.createElement('select');

        for (let i = 0; i < TIPOS_FIGURA_EJ19.length; i++)
        {
            let opcion = document.createElement('option');
            opcion.value = TIPOS_FIGURA_EJ19[i];
            opcion.innerText = TIPOS_FIGURA_EJ19[i];
            this._selectorFigura.appendChild(opcion);
        }

        this._botonCargar = document.createElement('button');
        this._botonCargar.innerText = 'Cargar';

        this._botonLimpiar = document.createElement('button');
        this._botonLimpiar.innerText = 'Limpiar';

        this._campoGrosor = document.createElement('input');
        this._campoGrosor.type = 'text';
        this._campoGrosor.placeholder = 'Grosor';
        this._campoGrosor.value = '1';

        this._botonLinea = document.createElement('button');

        this.appendChild(this._selectorFigura);
        this.appendChild(this._botonCargar);
        this.appendChild(this._botonLimpiar);
        this.appendChild(this._campoGrosor);
        this.appendChild(this._botonLinea);

        this._mostrarTipoLinea();
    }

    get tipoFigura()
    {
        return this._selectorFigura.value;
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
        this._botonLinea.innerText = 'Línea: ' + TIPOS_LINEA_EJ19[this._tipoLinea];
    }

    _onCambiarLinea()
    {
        this._tipoLinea = (this._tipoLinea + 1) % TIPOS_LINEA_EJ19.length;
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

customElements.define('x-view-ej19', ViewEj19);

class ControllerEj19
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
            dibujarFigurasEj19(canvas, figuras);
        });
    }

    onViewRequest(event)
    {
        if (event.detail === 'cargar')
        {
            let tipo = this._view.tipoFigura;
            let json = prompt('Ingrese el ' + tipo + ' en JSON. Ejemplo: ' + ejemploJsonEj19(tipo));

            if (json !== null && json !== '')
            {
                this._model.agregarFigura(JSON.parse(json), tipo, this._view.grosor, this._view.tipoLinea);
            }
        }

        if (event.detail === 'limpiar')
        {
            this._model.limpiar();
        }
    }
}

function mainEj19()
{
    let model = new ModelEj19();
    let view = new ViewEj19();
    let controller = new ControllerEj19(view, model);
    controller.enable();
    document.getElementById('app').appendChild(view);
}
