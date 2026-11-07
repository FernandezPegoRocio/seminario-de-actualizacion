function ejercicio31(canvas)
{
    let ctx = canvas.getContext('2d');

    let ancho = 300;
    let alto  = 200;
    let tanY  = Math.tan(Math.PI / 9);

    ctx.save();
    ctx.translate(250, 150);
    ctx.transform(1, tanY, 0, 1, 0, 0);
    ctx.fillStyle = '#e76f51';
    ctx.fillRect(0, 0, ancho, alto);
    ctx.restore();
}
