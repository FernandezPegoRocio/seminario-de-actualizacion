class SliderEj13 extends HTMLElement
{
    constructor()
    {
        super();

        this._etiqueta = document.createElement('label');

        this._slider = document.createElement('input');
        this._slider.type = 'range';
        this._slider.min  = 0;
        this._slider.max  = 255;

        this._valor = document.createElement('span');

        this.appendChild(this._etiqueta);
        this.appendChild(this._slider);
        this.appendChild(this._valor);
    }

    get value()
    {
        return parseInt(this._slider.value);
    }

    set value(nuevoValor)
    {
        this._slider.value = nuevoValor;
        this._valor.innerText = nuevoValor;
    }

    set etiqueta(texto)
    {
        this._etiqueta.innerText = texto + ': ';
    }

    _onInput()
    {
        this._valor.innerText = this._slider.value;
        this.dispatchEvent(new CustomEvent('request', { detail: 'cambio' }));
    }

    connectedCallback()
    {
        this._slider.oninput = this._onInput.bind(this);
    }

    disconnectedCallback()
    {
        this._slider.oninput = null;
    }
}

customElements.define('x-slider-ej13', SliderEj13);

function crearSliderEj13(contenedor, etiqueta, valor, onCambio)
{
    let slider = new SliderEj13();
    slider.etiqueta = etiqueta;
    slider.value = valor;
    slider.addEventListener('request', onCambio);
    contenedor.appendChild(slider);

    return slider;
}

function dibujarTableroEj13(ctx, r, g, b)
{
    let tamanoCasilla = 32;
    let colorOscuro = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    for (let fila = 0; fila < 8; fila++)
    {
        for (let columna = 0; columna < 8; columna++)
        {
            if ((fila + columna) % 2 === 0)
            {
                ctx.fillStyle = 'white';
            }
            else
            {
                ctx.fillStyle = colorOscuro;
            }

            ctx.fillRect(columna * tamanoCasilla, fila * tamanoCasilla, tamanoCasilla, tamanoCasilla);
        }
    }
}

function ejercicio13(canvas)
{
    let ctx = canvas.getContext('2d');
    let controles = document.createElement('div');
    let sliderR;
    let sliderG;
    let sliderB;

    function redibujar()
    {
        dibujarTableroEj13(ctx, sliderR.value, sliderG.value, sliderB.value);
    }

    sliderR = crearSliderEj13(controles, 'R', 0, redibujar);
    sliderG = crearSliderEj13(controles, 'G', 0, redibujar);
    sliderB = crearSliderEj13(controles, 'B', 0, redibujar);

    canvas.parentElement.insertBefore(controles, canvas);

    redibujar();
}
