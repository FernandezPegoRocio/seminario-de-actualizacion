function dibujarPoligono(ctx, puntos)
{
    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);

    for (let i = 1; i < puntos.length; i++)
    {
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }

    ctx.closePath();
}

function rellenarPoligonoConGradiente(ctx, puntos, colorHex1, colorHex2)
{
    let minX = puntos[0].x;
    let maxX = puntos[0].x;
    let minY = puntos[0].y;
    let maxY = puntos[0].y;

    for (let i = 1; i < puntos.length; i++)
    {
        minX = Math.min(minX, puntos[i].x);
        maxX = Math.max(maxX, puntos[i].x);
        minY = Math.min(minY, puntos[i].y);
        maxY = Math.max(maxY, puntos[i].y);
    }

    let centroX = (minX + maxX) / 2;
    let centroY = (minY + maxY) / 2;
    let radio = Math.sqrt((maxX - minX) * (maxX - minX) + (maxY - minY) * (maxY - minY)) / 2;
    let angulo = Math.PI / 4;
    let desplazamientoX = Math.cos(angulo) * radio;
    let desplazamientoY = Math.sin(angulo) * radio;

    let gradiente = ctx.createLinearGradient(
        centroX - desplazamientoX,
        centroY + desplazamientoY,
        centroX + desplazamientoX,
        centroY - desplazamientoY
    );

    gradiente.addColorStop(0, colorHex1);
    gradiente.addColorStop(1, colorHex2);

    dibujarPoligono(ctx, puntos);
    ctx.fillStyle = gradiente;
    ctx.fill();
}

function ejercicio15(canvas)
{
    let ctx = canvas.getContext('2d');

    let puntos = [
        { x: 400, y: 150 },
        { x: 550, y: 260 },
        { x: 490, y: 440 },
        { x: 310, y: 440 },
        { x: 250, y: 260 }
    ];

    rellenarPoligonoConGradiente(ctx, puntos, '#ff0000', '#0000ff');
}
