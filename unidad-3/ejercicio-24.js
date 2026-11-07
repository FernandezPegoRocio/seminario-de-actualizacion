function ejercicio24(canvas)
{
    let ctx = canvas.getContext('2d');
    let imagen = new Image();

    imagen.onload = function()
    {
        ctx.save();

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 220, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);

        ctx.restore();
    };

    imagen.src = 'imagen.png';
}
