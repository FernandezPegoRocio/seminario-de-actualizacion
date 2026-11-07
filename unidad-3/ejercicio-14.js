function crearInputColorEj14(contenedor, texto, valor, onCambio)
{
    let etiqueta = document.createElement('label');
    etiqueta.innerText = texto + ': ';

    let input = document.createElement('input');
    input.type  = 'color';
    input.value = valor;
    input.oninput = onCambio;

    etiqueta.appendChild(input);
    contenedor.appendChild(etiqueta);

    return input;
}

function dibujarRectanguloEj14(ctx, colorHex1, colorHex2)
{
    let ancho = 200;
    let alto  = 400;
    let x = 300;
    let y = 100;

    let gradiente = ctx.createLinearGradient(x, 0, x + ancho, 0);
    gradiente.addColorStop(0, colorHex1);
    gradiente.addColorStop(1, colorHex2);

    ctx.fillStyle = gradiente;
    ctx.fillRect(x, y, ancho, alto);
}

function ejercicio14(canvas)
{
    let ctx = canvas.getContext('2d');
    let controles = document.createElement('div');
    let inputColor1;
    let inputColor2;

    function redibujar()
    {
        dibujarRectanguloEj14(ctx, inputColor1.value, inputColor2.value);
    }

    inputColor1 = crearInputColorEj14(controles, 'Color 1', '#ff0000', redibujar);
    inputColor2 = crearInputColorEj14(controles, 'Color 2', '#0000ff', redibujar);

    canvas.parentElement.insertBefore(controles, canvas);

    redibujar();
}
