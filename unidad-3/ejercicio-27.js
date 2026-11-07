function ejercicio27(canvas)
{
    let ctx = canvas.getContext('2d');

    let ancho = 300;
    let alto  = 150;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = '#2a9d8f';
    ctx.fillRect(-ancho / 2, -alto / 2, ancho, alto);
    ctx.restore();
}
