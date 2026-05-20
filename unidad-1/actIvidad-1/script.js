let operacion = '';


function agregarNumero(valor) {
    operacion += valor;
    actualizarDisplay();
} 


function agregarOperador(valor) {
    operacion += valor;
    actualizarDisplay();
}

function calcular() {
    operacion = eval(operacion);
    actualizarDisplay();
}


function borrar() {
    operacion = '';
    actualizarDisplay();
}


function actualizarDisplay() {
    document.getElementById('display').value = operacion;
}
