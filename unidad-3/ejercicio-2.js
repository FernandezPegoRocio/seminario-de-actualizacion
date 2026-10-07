function ejercicio2(canvas)
{
    let ctx = canvas.getContext('2d');

    
    let x1 = 450;  let y1 = 200;   
    let x2 = 200;  let y2 = 500;  
    let x3 = 700;  let y3 = 500;  

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();
}