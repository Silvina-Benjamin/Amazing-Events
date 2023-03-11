// Creo la card de cada evento
    resultados = []
    const contenedorPrincipal=document.querySelector('#contenedorPrincipal')
    for (evento of data.events) {
        // console.log(evento)
        resultados.push(crearCardParaEvento(evento))
   }
    // console.log(resultados)
    for (let cardCreada of resultados){
        contenedorPrincipal.innerHTML += cardCreada;
    }
    console.log(contenedorPrincipal)



// //Cards
    
// function crearCardParaEvento (eventoParaCard) {
//     const contenedorOtraCard = document.createElement('div')
//     contenedorOtraCard.classList.add('card')
//     let otraCard = `<img src="${eventoParaCard.image}" class="card-img-top" alt="${eventoParaCard.name}">
//     <div class="card-body">
//     <h5 class="card-title">${eventoParaCard.name}</h5>
//     <p class="card-text">${eventoParaCard.description}</p>
//     <div class="fila-inferior-card">
//         <p>Price:<br> ${eventoParaCard.price}</p>
//         <a href="./details.html?id=${eventoParaCard._id}" class="btn btn-primary botonCard">Learn more</a>
//     </div>
//     </div>`
//     contenedorOtraCard.innerHTML = otraCard
//     document.querySelector('div.contenedor-4-cards').appendChild(contenedorOtraCard)
// }
// for(let event of data.events){
//     crearCardParaEvento (event)
// }


//Categorias

let listadoCategorias = []
for(let event of data.events){
    if (!listadoCategorias.includes(event.category)){
        listadoCategorias.push(event.category)
    }
}
let htmlCategorias = ""
for (let categoria of listadoCategorias){
    htmlCategorias += `<div class="col-6 col-md-4 col-xl-2 form-check">
    <input class="form-check-input" type="checkbox" value="${categoria}" id="input-${categoria}">
    <label class="form-check-label" for="input${categoria}">
        ${categoria}
    </label>
</div>`
}
document.querySelector(".contenedorCategorias").innerHTML= htmlCategorias


// Aplico Filtro Categoria
let checkbox = document.querySelectorAll('input[type=checkbox]')
checkbox.forEach(input => {
    input.addEventListener('change', (e)=>{
        if (e.target.checked) {
            let categoriaSeleccionada = e.target.value;
            let eventosFiltrados = data.events.filter(ev => {
                if (ev.category == categoriaSeleccionada) {
                    console.log(ev.category)
                    return true;
                }
            })
            for(let eF of eventosFiltrados){
                crearCardParaEvento (eF)
            }
        }
    })
})

// Filtro por búsqueda
let busqueda = document.querySelectorAll('input[type=search]')
busqueda.forEach(input => {
    input.addEventListener('change', (eb)=>{
            let palabraBusqueda = eb.target.value;
            console.log(palabraBusqueda)
            let filtroBusqueda = data.events.filter (eventobusqueda => {
                eventobusqueda.preventDefault
                if(eventobusqueda.category == palabraBusqueda){
                console.log(eventobusqueda.category)
                return true;
                }
            })
            for(let eB of palabraBusqueda){
                crearCardParaEvento (eB)
            }
    })
})