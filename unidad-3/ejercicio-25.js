function ejercicio25(canvas) {
    canvas.width  = 500;
    canvas.height = 500;

    // Crear controles si no existen
    let contenedor = canvas.parentElement;
    if (!contenedor.querySelector('.ej25-controles')) {
        let div = document.createElement('div');
        div.className = 'ej25-controles';
        div.style.marginBottom = '10px';
        div.innerHTML = `
            <label>Imagen URL:
                <input type="text" id="ej25-url" value="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/120px-PNG_transparency_demonstration_1.png" style="width:320px">
            </label>
            <label>Repeticion:
                <select id="ej25-rep">
                    <option value="repeat">repeat</option>
                    <option value="repeat-x">repeat-x</option>
                    <option value="repeat-y">repeat-y</option>
                    <option value="no-repeat">no-repeat</option>
                </select>
            </label>
            <button id="ej25-btn">Aplicar</button>
        `;
        contenedor.insertBefore(div, canvas);

        div.querySelector('#ej25-btn').addEventListener('click', function() {
            dibujar25(canvas);
        });
        div.querySelector('#ej25-rep').addEventListener('change', function() {
            dibujar25(canvas);
        });
    }
    dibujar25(canvas);
}

function dibujar25(canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let url = document.getElementById('ej25-url').value;
    let rep = document.getElementById('ej25-rep').value;

    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = function() {
        let patron = ctx.createPattern(img, rep);
        ctx.fillStyle = patron;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    img.onerror = function() {
        ctx.fillStyle = '#eee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.font = '16px sans-serif';
        ctx.fillText('No se pudo cargar la imagen', 20, 50);
    };
}