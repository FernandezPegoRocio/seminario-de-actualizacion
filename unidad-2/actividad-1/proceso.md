---------------------------------------------------------CONSIGNA---------------------------------------------------------

A partir del código desarrollado en la actividad "WebComponents II" (Calculadora), desarrollar la migración del 
WebComponent monolítico a su correspondiente diseño basado en MVC siguiendo los lineamientos planteados en el 
apunte de cátedra.

--------------------------------------------------------PROCESO-----------------------------------------------------------

---Para su solución se usó un único archivo index.html siguiendo el lineamiento trabajado en clase
---Se separó el WebComponent monolítico en tres clases con responsabilidades bien definidas:

---MODEL - CalculadoraModel extends EventTarget:

   + hereda de EventTarget para poder notificar cambios via dispatchEvent siguiendo el patrón Observer

   + this.operacion se inicializa como string vacío

   + getOperacion() --> devuelve el string de la operación actual

   + agregarValor(valor) --> concatena el valor recibido a this.operacion y despacha el evento 'changed'

   + calcular() --> evalúa la operación con eval(), actualiza this.operacion y despacha el evento 'changed'

   + borrar() --> resetea this.operacion a vacío y despacha el evento 'changed'

   + el Model es independiente de la Vista, no la conoce ni tiene ninguna conexión con ella

---VIEW - CalculadoraView extends HTMLElement:

   + hereda de HTMLElement para renderizarse en el DOM

   + el constructor define y construye todos los elementos visuales igual que en el WebComponent anterior:
     display, tabla, botones numéricos, operadores, igual y borrar

   + update(valor) --> método pasivo que recibe un valor del controlador y lo muestra en el display

   + la Vista no conoce al Modelo ni tiene ninguna conexión con él

   + connectedCallback y disconnectedCallback implementan la interfaz mínima de WebComponents

   + los eventos NO se vinculan en connectedCallback sino en el Controller a través de init()

---CONTROLLER - CalculadoraController:

   + no hereda de ninguna clase

   + recibe modelObject y viewObject por constructor y los almacena en this.model y this.view

   + es el único que conoce y asocia tanto al Model como a la View

   + init() --> suscribe todos los eventos de la vista con addEventListener y .bind(this, valor)
     y suscribe el evento 'changed' del modelo con addEventListener
     y establece el estado inicial de la vista llamando a this.view.update()

   + release() --> desuscribe todos los eventos con removeEventListener para evitar memory leaks

   + onNumeroClick(valor) --> recibe el valor del botón presionado y llama a this.model.agregarValor()

   + onIgualClick() --> llama a this.model.calcular()

   + onBorrarClick() --> llama a this.model.borrar()

   + onModelChanged() --> recibe la notificación del modelo y llama a this.view.update()

---En main() se instancian las tres clases por separado y se inyectan en el Controller:

   + let miModel      = new CalculadoraModel()

   + let miView       = new CalculadoraView()

   + let miController = new CalculadoraController(miModel, miView)

   + miController.init() --> nada funciona hasta que se llama a este método

   + document.body.appendChild(miView) --> agrega la vista al DOM

--------------------------------------------------------EJECUCIÓN---------------------------------------------------------

---Abrir el archivo index.html en el navegador

---Se visualiza la calculadora con el mismo aspecto que en la actividad anterior

---Al presionar cualquier botón numérico u operador el Controller recibe el evento,
   actualiza el Model y el Model notifica el cambio via dispatchEvent

---El Controller recibe la notificación y llama a view.update() para mostrar el resultado en el display

---Al presionar "=" el Controller llama a model.calcular() y el resultado se muestra en el display

---Al presionar "Borrar" el Controller llama a model.borrar() y el display se limpia