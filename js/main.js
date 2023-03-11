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

    // array de busqueda por palabra
    let arrayDeBusqueda = data.events
 
    casillasCheckbox.forEach(input => {
        input.addEventListener('change', (e) =>{
            const casilla = e.target;
            if (casilla.checked){
                categoriasSeleccionadas.push(casilla.value);  
                
            } else {
                categoriasSeleccionadas = categoriasSeleccionadas.filter(categoria => categoria != casilla.value)
            }
            aplicoFiltro()
        })
    })

    document.addEventListener('submit', (eb)=> {
        eb.preventDefault()
        let palabraBusqueda = eb.target[0].value.toLowerCase();
        console.log("la palabra ingresada es " + palabraBusqueda)
        let filtroBusqueda = data.events.filter (eventobusqueda => {    
            if(eventobusqueda.name.toLowerCase().includes (palabraBusqueda) || eventobusqueda.description.toLowerCase().includes(palabraBusqueda )){
                return true;
            }
            
        })
        console.log(filtroBusqueda)
        for(let eB of filtroBusqueda){
            contenedorPrincipal.innerHTML += crearCardParaEvento (eB)
        }
        })


        
// Creo el filtro por categoria
    
    // variable que tendra todos los checkbox
    // let casillasCheckbox = document.querySelectorAll('input[type=checkbox]')
 
    // casillasCheckbox.forEach(input => {
    //     input.addEventListener('change', (e) =>{
    //         const casilla = e.target;
    //         if (casilla.checked){
    //             categoriasSeleccionadas.push(casilla.value);  
                
    //         } else {
    //             categoriasSeleccionadas = categoriasSeleccionadas.filter(categoria => categoria != casilla.value)
    //         }
    //         aplicoFiltro()
    //     })
    // })

    // Creo el filtro para búsqueda por palabra

