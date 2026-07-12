---------------------------------------------------------CONSIGNA---------------------------------------------------------
A partir del código desarrollado en la actividad "WebComponents II" (Calculadora), desarrollar la migración del
WebComponent a su correspondiente diseño basado en MVC

--------------------------------------------------------PROCESO-----------------------------------------------------------

---Para su solución se usó un unico archivo index.html
---Se separo el WebComponent en tres clases con responsabilidades bien definidas:

---MODELO - CalculadoraModel extends EventTarget:

   + hereda de EventTarget para poder notificar cambios via dispatchEvent siguiendo el patrón Observer

   + this.operacion se inicializa como string vacío

   + getOperacion() --> devuelve el string de la operacion actual

   + agregarValor(valor) --> concatena el valor recibido a this.operacion y despacha el evento 'changed'

   + calcular() --> evalua la operacion con eval(), actualiza this.operacion y despacha el evento 'changed'

   + borrar() --> resetea this.operacion a vacío y despacha el evento 'changed'

   + el Modelo es independiente de la Vista, no la conoce ni tiene ninguna conexión con ella

---VISTA - CalculadoraView extends HTMLElement:

   + hereda de HTMLElement para renderizarse en el DOM

   + el constructor define y construye todos los elementos visuales igual que en el WebComponent anterior:
     display, tabla, botones numéricos, operadores, igual y borrar

   + update(valor) --> metodo pasivo que recibe un valor del controlador y lo muestra en el display

   + _despacharRequest(detail) --> metodo interno que dispara un CustomEvent llamado 'request'
     con el detail correspondiente a cada boton presionado

   + la Vista no conoce al Modelo ni tiene ninguna conexion con él

   + en connectedCallback la vista vincula sus propios botones internamente con addEventListener
     y cada uno llama a _despacharRequest() con su valor como detail

   + en disconnectedCallback se desvinculan todos los eventos con removeEventListener

---CONTROLADOR - CalculadoraController:

   + no hereda de ninguna clase

   + recibe modelObject y viewObject por constructor y los almacena en this.model y this.view

   + es el unico que conoce y asocia tanto al modelo como a la vista

   + init() --> suscribe el evento 'changed' del modelo con addEventListener
     y suscribe el único evento personalizado 'request' de la vista con addEventListener
     y establece el estado inicial de la vista llamando a this.view.update()

   + release() --> desuscribe ambos eventos con removeEventListener para evitar memory leaks

   + onViewRequest(event) --> único manejador de eventos de la vista, discrimina la acción
     con event.detail:

     + si detail es '=' llama a this.model.calcular()
     + si detail es 'borrar' llama a this.model.borrar()
     + en cualquier otro caso llama a this.model.agregarValor(event.detail)

   + onModelChanged() --> recibe la notificacion del modelo y llama a this.view.update()

---En main() se instancian las tres clases por separado y se inyectan en el Controller:

   + let miModel      = new CalculadoraModel()

   + let miView       = new CalculadoraView()

   + let miController = new CalculadoraController(miModel, miView)

   + miController.init() --> nada funciona hasta que se llama a este método

   + document.body.appendChild(miView) --> agrega la vista al DOM

--------------------------------------------------------EJECUCIÓN---------------------------------------------------------

---Abrir el archivo index.html en el navegador

---Se visualiza la calculadora con el mismo aspecto que en la actividad anterior

---Al presionar cualquier botón la vista despacha un CustomEvent 'request' con el valor como detail

---El Controlador recibe el evento y determina qué acción ejecutar según event.detail

---El Modelo procesa la acción y notifica el cambio via dispatchEvent('changed')

---El Controlador recibe la notificacion y llama a view.update() para mostrar el resultado en el display

---Al presionar "=" el modelo evalúa la operación y el resultado se muestra en el display

---Al presionar "Borrar" el modelo resetea la operación y el display se limpia


