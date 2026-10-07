function ejercicio3(canvas)
{
    let ctx = canvas.getContext('2d');

    let puntos = [
        { x: 410, y: 160 },
        { x: 580, y: 280 },
        { x: 520, y: 500 },
        { x: 300, y: 500 },
        { x: 240, y: 280 }
    ];

    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);

    for (let i = 1; i < puntos.length; i++)
    {
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }

    ctx.closePath();
    ctx.stroke();
}