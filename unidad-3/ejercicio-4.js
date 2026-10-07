function ejercicio4(canvas)
{
    canvas.width  = 500;
    canvas.height = 500;

    let ctx    = canvas.getContext('2d');
    let centroX = 250;
    let centroY = 250;

    for (let radio = 250; radio > 0; radio -= 25)
    {
        ctx.beginPath();
        ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
}