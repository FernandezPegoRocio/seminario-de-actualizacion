function ejercicio25(canvas)
{
    let ctx = canvas.getContext('2d');
    let imagen = new Image();

    imagen.onload = function()
    {
        ctx.save();
        ctx.filter = 'brightness(120%) contrast(150%) blur(2px)';
        ctx.drawImage(imagen, 20, 20, 480, 360);
        ctx.restore();

        ctx.beginPath();
        ctx.arc(650, 200, 100, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = '#2a9d8f';
        ctx.fill();
    };

    imagen.src = 'imagen.png';
}
