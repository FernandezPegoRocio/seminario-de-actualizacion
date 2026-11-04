function ejercicio16(canvas) {
    canvas.width = 500;
    canvas.height = 500;
    let ctx = canvas.getContext('2d');

    let centroX = 250;
    let centroY = 250;
    let radio = 200;

    let gradiente = ctx.createRadialGradient(centroX, centroY, 0, centroX, centroY, radio);
    gradiente.addColorStop(0, 'white');
    gradiente.addColorStop(1, 'black');

    ctx.beginPath();
    ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
    ctx.fillStyle = gradiente;
    ctx.fill();
}