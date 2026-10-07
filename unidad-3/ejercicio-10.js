function ejercicio10(canvas)
{
    let ctx = canvas.getContext('2d');

    // Línea 1: lineCap 'butt', lineJoin 'miter'
    ctx.lineWidth = 8;
    ctx.lineCap   = 'butt';
    ctx.lineJoin  = 'miter';

    ctx.beginPath();
    ctx.moveTo(50,  50);
    ctx.lineTo(150, 150);
    ctx.lineTo(250, 50);
    ctx.stroke();

    // Línea 2: lineCap 'round', lineJoin 'round'
    ctx.lineWidth = 8;
    ctx.lineCap   = 'round';
    ctx.lineJoin  = 'round';

    ctx.beginPath();
    ctx.moveTo(50,  250);
    ctx.lineTo(150, 350);
    ctx.lineTo(250, 250);
    ctx.stroke();

    // Línea 3: lineCap 'square', lineJoin 'bevel'
    ctx.lineWidth = 8;
    ctx.lineCap   = 'square';
    ctx.lineJoin  = 'bevel';

    ctx.beginPath();
    ctx.moveTo(50,  450);
    ctx.lineTo(150, 550);
    ctx.lineTo(250, 450);
    ctx.stroke();
}