function ejercicio11(canvas)
{
    let ctx = canvas.getContext('2d');

    for (let i = 0; i < canvas.width; i += 15)
    {
        // diagonal continua
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();

        // diagonal punteada
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(i + 7, 0);
        ctx.lineTo(i + 7 + canvas.height, canvas.height);
        ctx.stroke();
    }
}