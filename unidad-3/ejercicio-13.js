function ejercicio13(canvas) {
    // Crear controles si no existen
    let contenedor = canvas.parentElement;
    if (!contenedor.querySelector('.ej13-controles')) {
        let div = document.createElement('div');
        div.className = 'ej13-controles';
        div.style.marginBottom = '10px';
        div.innerHTML = `
            <label>R: <input type="range" id="slider-r" min="0" max="255" value="128"></label>
            <label>G: <input type="range" id="slider-g" min="0" max="255" value="64"></label>
            <label>B: <input type="range" id="slider-b" min="0" max="255" value="200"></label>
        `;
        contenedor.insertBefore(div, canvas);
 
        // Redibujar al mover cualquier slider
        div.querySelectorAll('input').forEach(function(input) {
            input.addEventListener('input', function() { dibujar13(canvas); });
        });
    }
    dibujar13(canvas);
}
 
function dibujar13(canvas) {
    let ctx = canvas.getContext('2d');
    let tamanoCasilla = 32;
 
    let r = parseInt(document.getElementById('slider-r').value);
    let g = parseInt(document.getElementById('slider-g').value);
    let b = parseInt(document.getElementById('slider-b').value);
 
    for (let fila = 0; fila < 8; fila++) {
        for (let col = 0; col < 8; col++) {
            ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
            ctx.fillRect(col * tamanoCasilla, fila * tamanoCasilla, tamanoCasilla, tamanoCasilla);
        }
    }
}
 