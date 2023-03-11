function crearCardParaEvento (eventoCard){
    const nuevaCard= `<div class="card">
    <img src="${eventoCard.image}" class="card-img-top" alt="${eventoCard.name}">
    <div class="card-body">
    <h5 class="card-title">${eventoCard.name}</h5>
    <p class="card-text">${eventoCard.description}</p>
    <div class="fila-inferior-card">
        <p>Price:<br> ${eventoCard.price}</p>
        <a href="./details.html?id=${eventoCard._id}" class="btn btn-primary botonCard">Learn more</a>
    </div>
    </div>
    </div>`
    return nuevaCard
}