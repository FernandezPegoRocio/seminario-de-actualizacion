##--------------------------------------------------------CONSIGNA---------------------------------------------------------##
Analice el código HTML/CSS/JS proporcionado a través del repositorio GitHub. Se trata de una plantilla que 
representa un prototipo de panel de interfaz gráfica basada en la librería CSS de W3Schools para una aplicación 
genérica. Su objetivo será construir un WebComponent bajo la arquitectura MVC. En esta primera actividad se 
solicitará el desarrollo de WCApplicationView como la primera abstracción del conjunto: WCApplicationView, 
WCApplicationController y WCApplicationModel.

Estrategia de resolución:
1. Analizar el código proporcionado y efectuar una limpieza dejando solo:
   - Barra superior con botones del lado derecho (sin barra de búsqueda)
   - Barra lateral izquierda
   - Cuerpo derecho (dejarlo vacío)
   - Pie
   - Conservar todo el enlazamiento a código CSS de las etiquetas link
2. Una vez depurada la plantilla, implementar la clase WCApplicationView de modo tal que el WebComponent 
   libre de HTML permita la visualización correcta de la plantilla gráfica de la aplicación.
3. Identificar etiquetas HTML del proyecto original que contienen manejadores embebidos y migrarlos 
   a métodos de la clase, vinculándolos y desvinculándolos adecuadamente en connectedCallback 
   y disconnectedCallback.
4. Encapsular los elementos significativos de la interfaz en funciones de creación. Por ejemplo:
   function createButtonMenu(parametros) { ... }
##--------------------------------------------------------PROCESO----------------------------------------------------------##
---Se conservaron todos los enlaces CSS en el head:

   + Roboto (Google Fonts), Font Awesome 4.7.0, w3.css y w3-theme-teal.css

---Se identificaron los elementos significativos de la plantilla original y se encapsuló cada uno
   en una función de creación por fuera de la clase:

   + las funciones van por fuera porque solo se ejecutan una vez en el constructor
   + no deben ser accesibles como métodos públicos del componente

---Las funciones de creación son:

   + createNavbar()          --> barra superior con botones de mail, campana y usuario
   + createButtonMenu(texto, href, icono) --> cada botón del sidebar encapsulado con su ícono
   + createSidebar()         --> barra lateral con secciones MAIN NAVIGATION y LABELS
   + createContent()         --> cuerpo derecho vacío listo para recibir contenido
   + createFooter()          --> pie de página

---Cada función sigue la estructura de tres bloques:

   + primero se construyen todos los elementos con document.createElement()
   + luego se asignan todas las clases con classList.add() sin excepción
   + los estilos inline del HTML original se migraron propiedad por propiedad con 
element.style.propiedad
   + finalmente se ensambla la estructura con appendChild()

---No se utilizó innerHTML

---Se construyó la clase WCApplicationView extendiendo HTMLElement invocando super() como primera instrucción

---En el constructor se instancian todas las secciones llamando a las funciones de creación:
   + this.navbar  = createNavbar()
   + this.sidebar = createSidebar()
   + this.content = createContent()
   + this.footer  = createFooter()

---El manejador embebido del HTML original fue migrado al método onToggleSidebar():
   + reemplaza los onclick inline que mostraban y ocultaban el sidebar
   + implementa la lógica de toggle verificando el display actual del sidebar

---En connectedCallback se vincula el evento con addEventListener y .bind(this)

---En disconnectedCallback se desvincula el evento con removeEventListener

---En main() se instancia WCApplicationView y se agrega al DOM con document.body.appendChild()

##--------------------------------------------------------EJECUCIÓN-------------------------------------------------------##
---Abrir el archivo index.html en el navegador
---Se visualiza el panel con barra superior, barra lateral izquierda con navegación, cuerpo derecho vacío y pie de página
---Al hacer click en el botón de barras de la navbar se alterna la visibilidad del sidebar
---El cuerpo derecho queda vacío listo para recibir los WebComponents de las actividades siguientes

