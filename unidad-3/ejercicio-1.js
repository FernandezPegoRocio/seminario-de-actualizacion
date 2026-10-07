// ejercicio-1.js
// Consigna: Construya una función que sea capaz de dibujar
// una cruz diagonal (cruzando los vértices) de toda el área de dibujo.

// Una cruz diagonal cruza de esquina a esquina:
// - Una línea de (0,0) a (width, height)       → diagonal principal
// - Una línea de (width,0) a (0, height)        → diagonal secundaria

function ejercicio1(canvas)
{
    let ctx = canvas.getContext('2d');

    // --- DIAGONAL PRINCIPAL: de esquina superior izquierda a inferior derecha ---

    ctx.beginPath();

    // Mover el lápiz al origen (0,0) sin dibujar
    ctx.moveTo( 0 , 0 );

    // Trazar una línea hasta la esquina opuesta (width, height)
    ctx.lineTo( canvas.width, canvas.height);

    // Materializar el trazo visualmente
    ctx.stroke();

    ctx.closePath();

    // --- DIAGONAL SECUNDARIA: de esquina superior derecha a inferior izquierda ---

    ctx.beginPath();

    // Mover el lápiz a la esquina superior derecha (width, 0)
    ctx.moveTo( canvas.width , 0 );

    // Trazar una línea hasta la esquina inferior izquierda (0, height)
    ctx.lineTo( 0 , canvas.height );

    ctx.stroke();

    ctx.closePath();
}