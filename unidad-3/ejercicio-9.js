function ejercicio9(canvas)
{
    let ctx = canvas.getContext('2d');

    for (let grosor = 1; grosor <= 25; grosor++)
    {
        let x = grosor * 16;

        ctx.lineWidth = grosor;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
}