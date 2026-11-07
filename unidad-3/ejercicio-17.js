function ejercicio17(canvas)
{
    let ctx = canvas.getContext('2d');

    let centroX = canvas.width / 2;
    let radioX  = 120;
    let radioY  = 40;
    let arriba  = 150;
    let alto    = 300;
    let izquierda = centroX - radioX;

    let gradienteCuerpo = ctx.createLinearGradient(izquierda, 0, izquierda + radioX * 2, 0);
    gradienteCuerpo.addColorStop(0, '#12355b');
    gradienteCuerpo.addColorStop(0.35, '#7fb2e5');
    gradienteCuerpo.addColorStop(1, '#0b2038');

    ctx.fillStyle = gradienteCuerpo;

    ctx.beginPath();
    ctx.ellipse(centroX, arriba + alto, radioX, radioY, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillRect(izquierda, arriba, radioX * 2, alto);

    let gradienteTapa = ctx.createLinearGradient(izquierda, arriba, izquierda + radioX * 2, arriba);
    gradienteTapa.addColorStop(0, '#9cc4ec');
    gradienteTapa.addColorStop(1, '#e3f0fb');

    ctx.fillStyle = gradienteTapa;

    ctx.beginPath();
    ctx.ellipse(centroX, arriba, radioX, radioY, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}
