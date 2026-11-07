function ejercicio21(canvas)
{
    let ctx = canvas.getContext('2d');
    let imagen = new Image();

    imagen.onload = function()
    {
        ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);
    };

    imagen.src = 'imagen.png';
}
