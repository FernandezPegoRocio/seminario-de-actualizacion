function dibujarPoligono(ctx, puntos) {
    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);
    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }
    ctx.closePath();
}

function ejercicio15(canvas) {
    canvas.width  = 500;
    canvas.height = 500;

    // Crear controles si no existen
    let contenedor = canvas.parentElement;
    if (!contenedor.querySelector('.ej15-controles')) {
        let div = document.createElement('div');
        div.className = 'ej15-controles';
        div.style.marginBottom = '10px';
        // Reusar color1/color2 solo si no existen ya (puede convivir con ej14)
        div.innerHTML = `
            <label>Color 1: <input type="color" id="color1" value="#ff0000"></label>
            <label>Color 2: <input type="color" id="color2" value="#0000ff"></label>
        `;
        contenedor.insertBefore(div, canvas);

        div.querySelectorAll('input').forEach(function(input) {
            input.addEventListener('input', function() { dibujar15(canvas); });
        });
    }
    dibujar15(canvas);
}

function dibujar15(canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let color1 = document.getElementById('color1').value;
    let color2 = document.getElementById('color2').value;

    let puntos = [
        { x: 100, y: 400 },
        { x: 250, y: 100 },
        { x: 400, y: 400 }
    ];

    let angulo = Math.PI / 4;
    let gradiente = ctx.createLinearGradient(
        100, 400,
        100 + Math.cos(angulo) * 300,
        400 - Math.sin(angulo) * 300
    );
    gradiente.addColorStop(0, color1);
    gradiente.addColorStop(1, color2);

    dibujarPoligono(ctx, puntos);
    ctx.fillStyle = gradiente;
    ctx.fill();
}