function ejercicio5(canvas)
{
    canvas.width  = 500;
    canvas.height = 500;

    let ctx     = canvas.getContext('2d');
    let centroX = 250;
    let centroY = 250;
    let puntajes = [1000, 750, 500, 100, 50];

    for (let i = 0; i < puntajes.length; i++)
    {
        let radio = (5 - i) * 50;

        ctx.beginPath();
        ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        ctx.fillText(puntajes[i], centroX, centroY - radio + 25);
    }
}