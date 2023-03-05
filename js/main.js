//Cards
function crearCardParaEvento (eventoParaCard) {
    const contenedorOtraCard = document.createElement('div')
    contenedorOtraCard.classList.add('card')
    let otraCard = `<img src="${eventoParaCard.image}" class="card-img-top" alt="cinema">
    <div class="card-body">
    <h5 class="card-title">${eventoParaCard.name}</h5>
    <p class="card-text">${eventoParaCard.description}</p>
    <div class="fila-inferior-card">
        <p>Price:<br> ${eventoParaCard.price}</p>
        <a href="./details.html" class="btn btn-primary">Learn more</a>
    </div>
    </div>`
    contenedorOtraCard.innerHTML = otraCard
    
    // const nuevoDiv = document.querySelector('div.contenedor-4-cards')
    document.querySelector('div.contenedor-4-cards').appendChild(contenedorOtraCard)
}

for(let event of data.events){
    crearCardParaEvento (event)

}


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
let resultados = [];

// Aplico Filtro
let checkbox = document.querySelectorAll('input[type=checkbox]')
    checkbox.forEach(input => {
        input.addEventListener('change', (e)=>{
        if (e.target.checked) {
            let categoriaSeleccionada = e.target.value;
            // resultados = listadoCategorias.filter(categoria => categoriaSeleccionada == categoria)
            console.log(e)
            
            let eventosFiltrados = data.events.filter(ev => {
                if (ev.category == categoriaSeleccionada) {
                    console.log(ev.category == categoriaSeleccionada)
                    return true;
                }
            })
            console.log(eventosFiltrados.length + "  !")
            for(let eF of eventosFiltrados){
                crearCardParaEvento (eF)
            }
        }
        })
    })