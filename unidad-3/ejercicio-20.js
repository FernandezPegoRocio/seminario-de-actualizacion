function ejercicio20(canvas)
{
    let ctx = canvas.getContext('2d');
    let imagen = new Image();

    imagen.onload = function()
    {
        ctx.drawImage(imagen, 80, 60);
    };

    imagen.src = 'imagen.png';
}
