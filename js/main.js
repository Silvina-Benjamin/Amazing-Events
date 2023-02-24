for(let event of data.events){
console.log(event.name);
const contenedorOtraCard = document.createElement('div')
contenedorOtraCard.classList.add('card')
let otraCard = `<img src="${event.image}" class="card-img-top" alt="cinema">
<div class="card-body">
<h5 class="card-title">${event.name}</h5>
<p class="card-text">${event.description}</p>
<div class="fila-inferior-card">
    <p>Price:<br> ${event.price}</p>
    <a href="./details.html" class="btn btn-primary">Learn more</a>
</div>
</div>`
contenedorOtraCard.innerHTML = otraCard
console.log(contenedorOtraCard)
const nuevoDiv = document.querySelector('div.contenedor-4-cards')
document.querySelector('div.contenedor-4-cards').appendChild(contenedorOtraCard)
}
