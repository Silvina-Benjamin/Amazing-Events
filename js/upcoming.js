// defino variables que voy a usar en general

// array que contendrá las cards generadas
resultados = []
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
// array que contendrá los eventos con fecha futuro
    let upcomingEvents=[]

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let data;

async function getEventData(){
    try {
        const response = await fetch(urlApi);
        await response.json()
            .then(json => {
                data = json;
                
                pushearUpcomingEvents()

                listaCategoriasUpcoming()

                agregarCardUpcoming()

                agregarCategoriasAListadoUpcoming()
                                
                contenedorCategorias.innerHTML = htmlCategorias

                 // Creo el filtro por categoria y busqueda por palabra
                // variable que tendra todos los checkbox
                let casillasCheckbox = document.querySelectorAll('input[type=checkbox]')

                // variable que corestpondera a lo que se escriba en la barra de búsqueda
                let busqueda = document.querySelectorAll('input[type=search]')


                casillasCheckbox.forEach(input => {
                    input.addEventListener('change', (e) =>{
                        const casilla = e.target;
                        if (casilla.checked){
                            categoriasSeleccionadas.push(casilla.value);  
                        } else {
                            categoriasSeleccionadas = categoriasSeleccionadas.filter(categoria => categoria != casilla.value)
                        }
                        aplicoFiltroCategoria()
                    })

                    document.addEventListener('submit', (eb)=> {
                        let palabraBusqueda = eb.target[0].value.toLowerCase();
                        eb.preventDefault()
                        aplicoFiltroPalabra(palabraBusqueda)
                        })
                    })  
            })
    } catch (error){
    
    }
}
getEventData()


    

function pushearUpcomingEvents(){
    for(let event of data.events){
        let currentDate = new Date(data.currentDate);
        let eventDate = new Date(event.date);
            if (eventDate > currentDate) {
                upcomingEvents.push(event)
                
            }
        }
}

function listaCategoriasUpcoming(){
    for (evento of upcomingEvents) {
        resultados.push(crearCardParaEvento(evento))
        if (!listadoCategorias.includes(evento.category)){
            listadoCategorias.push(evento.category)
        }
    }
}

function agregarCardUpcoming(){
    for (let cardCreada of resultados){
        contenedorPrincipal.innerHTML += cardCreada;
    }
}
function agregarCategoriasAListadoUpcoming(){
    for (let categoria of listadoCategorias){
        htmlCategorias += agregoCategorias(categoria)
    }
}