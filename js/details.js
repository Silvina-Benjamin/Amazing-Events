// Boton a Details
let queryString = location.search;
let params = new URLSearchParams(queryString)
let id = params.get('id');
let evento = ""

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let data;

async function getEventData(){
    try {
        const response = await fetch(urlApi);
        //throw new Error ("no se pudo obtener la data");
        await response.json()
            .then(json => {
                data = json;

                evento = data.events.find(ed => ed._id == id);
                console.log(evento)
                crearCardDetails()    
    })
  } catch (error){

  }
}

function crearCardDetails(){
  document.querySelector('body').innerHTML =`<div class="row g-0 contenedorDetails">
      <div class="col-12 col-md-8 col-xl-6">
        <img src="${evento.image}" class="img-fluid rounded-start"  alt="${evento.name}">
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
}
getEventData()