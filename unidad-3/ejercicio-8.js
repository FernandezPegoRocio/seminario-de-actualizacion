function ejercicio8(canvas)
{
    canvas.width  = 500;
    canvas.height = 500;

    let ctx       = canvas.getContext('2d');
    let porciones = [
        { valor: 0.30, etiqueta: 'Rojo'     },
        { valor: 0.50, etiqueta: 'Azul'     },
        { valor: 0.10, etiqueta: 'Verde'    },
        { valor: 0.10, etiqueta: 'Amarillo' }
    ];
    let centroX      = 250;
    let centroY      = 250;
    let radio        = 200;
    let anguloActual = 0;

    for (let i = 0; i < porciones.length; i++)
    {
        let porcion     = porciones[i].valor;
        let anguloFinal = anguloActual + (porcion * Math.PI * 2);

        ctx.beginPath();
        ctx.moveTo(centroX, centroY);
        ctx.arc(centroX, centroY, radio, anguloActual, anguloFinal);
        ctx.closePath();
        ctx.stroke();

        let anguloMedio = anguloActual + (porcion * Math.PI);
        let textoX = centroX + (radio / 2) * Math.cos(anguloMedio);
        let textoY = centroY + (radio / 2) * Math.sin(anguloMedio);
        ctx.fillText(porciones[i].etiqueta + ' ' + porcion * 100 + '%', textoX, textoY);

        anguloActual = anguloFinal;
    }
}