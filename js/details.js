// Boton a Details
let queryString = location.search;
let params = new URLSearchParams(queryString)
let id = params.get('id');
let evento = ""

console.log(id)
evento = data.events.find(ed => ed._id == id);
console.log(evento)
document.querySelector('body').innerHTML =`<div class="row g-0">
  <div class="col-12 col-md-8 col-xl-6">
    <img src="${evento.image}" class="img-fluid rounded-start"  alt="Museum Tour">
  </div>
  <div class=" col-xl-6">
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <p class="card-text">${evento.description}</p>
      <p class="card-date"><small class="text-muted">Date: ${evento.date}</small></p>
      <p class="card-place"><small class="text-muted">Location: ${evento.place}</small></p>
      <p class="card-assistance"><small class="text-muted">Assistance: ${evento.assistance}</small></p>
      <p class="card-assistance"><small class="text-muted">Capacity: ${evento.capacity}</small></p>
      <p class="card-assistance"><small class="text-muted">Price: ${evento.price}</small></p>
    </div>
  </div>
</div>
</div>`

