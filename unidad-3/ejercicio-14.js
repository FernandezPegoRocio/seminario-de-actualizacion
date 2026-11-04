function ejercicio14(canvas) {
    canvas.width  = 400;
    canvas.height = 200;

    // Crear controles si no existen
    let contenedor = canvas.parentElement;
    if (!contenedor.querySelector('.ej14-controles')) {
        let div = document.createElement('div');
        div.className = 'ej14-controles';
        div.style.marginBottom = '10px';
        div.innerHTML = `
            <label>Color 1: <input type="color" id="color1" value="#ff0000"></label>
            <label>Color 2: <input type="color" id="color2" value="#0000ff"></label>
        `;
        contenedor.insertBefore(div, canvas);

        div.querySelectorAll('input').forEach(function(input) {
            input.addEventListener('input', function() { dibujar14(canvas); });
        });
    }
    dibujar14(canvas);
}

function dibujar14(canvas) {
    let ctx = canvas.getContext('2d');

    let color1 = document.getElementById('color1').value;
    let color2 = document.getElementById('color2').value;

    let gradiente = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradiente.addColorStop(0, color1);
    gradiente.addColorStop(1, color2);

    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}