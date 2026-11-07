function ejercicio30(canvas)
{
    let ctx = canvas.getContext('2d');

    let lado = 200;
    let tanX = Math.tan(Math.PI / 6);

    ctx.save();
    ctx.translate(250, 200);
    ctx.transform(1, 0, tanX, 1, 0, 0);
    ctx.fillStyle = '#457b9d';
    ctx.fillRect(0, 0, lado, lado);
    ctx.restore();
}
