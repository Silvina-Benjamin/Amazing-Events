// defino variables que voy a usar en general

// array que contendrá las cards generadas
resultadosPasado = []
// variable que contendrá todas las cards
    const contenedorPrincipal = document.querySelector('#contenedorPrincipal')
// array que contendrá todas las categorias
    const listadoCategorias = []
// cadena de texto que sumará los contenedores de  cada card individual
    let htmlCategorias = ""
// variable que contendrá todas las checkboxes de categorias
    const contenedorCategorias = document.querySelector(".contenedorCategorias")
// array que tendrá las categorias seleccionadas
    let categoriasSeleccionadas = [] 
// array que contendrá los eventos con fecha pasado
    let pastEvents=[]

for(let event of data.events){
  let currentDate = new Date(data.currentDate);
  let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        pastEvents.push(event)
        console.log(pastEvents)
    }
  }

  for (evento of pastEvents) {
    resultadosPasado.push(crearCardParaEvento(evento))
    if (!listadoCategorias.includes(evento.category)){
        listadoCategorias.push(evento.category)
    }
  }

for (let cardCreada of resultadosPasado){
    contenedorPrincipal.innerHTML += cardCreada;
}
for (let categoria of listadoCategorias){
    htmlCategorias += agregoCategorias(categoria)
}
contenedorCategorias.innerHTML = htmlCategorias
