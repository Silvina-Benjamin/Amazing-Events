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
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let data;

async function getEventData(){
    try {
        const response = await fetch(urlApi);
        //throw new Error ("no se pudo obtener la data");
        await response.json()
            .then(json => {
                data = json;
                
                // Creo la card de cada evento y sumo su categoria al listado de categorias

                for (evento of data.events) {
                    resultados.push(crearCardParaEvento(evento))
                    if (!listadoCategorias.includes(evento.category)){
                        listadoCategorias.push(evento.category)
                    }
                }
                for (let cardCreada of resultados){
                    contenedorPrincipal.innerHTML += cardCreada;
                }
                for (let categoria of listadoCategorias){
                    htmlCategorias += agregoCategorias(categoria)
                }
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
                })

                document.addEventListener('submit', (eb)=> {
                    let palabraBusqueda = eb.target[0].value.toLowerCase();
                    eb.preventDefault()
                    aplicoFiltroPalabra(palabraBusqueda)
                    console.log(eb)
                    })
            })

    } catch (error){

    }
}
getEventData()



