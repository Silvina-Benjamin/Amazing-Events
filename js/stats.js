let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
// let past ="./past.js"
let resultados = []
let pastEvents = []
let listadoCategoriasPast = []
let upcomingEvents = []
let listadoCategoriasUpcoming = []


// nuevo:
let data;

async function getEventData(){
    //nuevo
    const response = await fetch(urlApi)
    data = await response.json().then(data => {
        llenarPrimeraTabla(data)
        getUpcomingData(data)
        getPastData(data)

    })


}
getEventData()


function getUpcomingData(data){
    pushearUpcomingEvents(data)

    llenarSegundaTabla(upcomingEvents)
}


async function getPastData(data){
    pushearPastEvents(data)
    llenarTerceraTabla(pastEvents);
}

function asistenciaEvento(evento) {
    let capacidad = evento.capacity;
    let asistencia = evento.assistance;
    let porcentajeAsistencia = asistencia/capacidad * 100;
    return porcentajeAsistencia;
}

// determino el evento con mayor asistencia
function mayorAsistencia(data) {
    let porcentajeMayorHastaAhora = 0;
    let eventoMayorHastaAhora = null;
    for (evento of data.events) {
        let porcentajeAComparar = asistenciaEvento(evento);
        if (porcentajeAComparar > porcentajeMayorHastaAhora) {
            porcentajeMayorHastaAhora = porcentajeAComparar
            eventoMayorHastaAhora = evento
            resultados.push(eventoMayorHastaAhora);
        }
    }
    return eventoMayorHastaAhora;
}

// determino el evento con menor asistencia 
function menorAsistencia(data) {
    let porcentajeMenorHastaAhora = 100;
    let eventoMenorHastaAhora = null;
    for (evento of data.events) {
        let porcentajeACompararMinimo = asistenciaEvento(evento);
        if (porcentajeACompararMinimo < porcentajeMenorHastaAhora) {
            porcentajeMenorHastaAhora = porcentajeACompararMinimo
            eventoMenorHastaAhora = evento
        }
    }
    return eventoMenorHastaAhora;
}

// determino el evento con mayor capacidad
function mayorCapacidad(data){
    let mayorCapacidadHastaAhora = 0
    let eventoMayorCapacidad = null;
    for (evento of data.events) {
        let capacidad = evento.capacity;
        if (mayorCapacidadHastaAhora < capacidad){
            mayorCapacidadHastaAhora = capacidad
            eventoMayorCapacidad = evento;
        }
    }
    return eventoMayorCapacidad

}
//Calcular ingresos promedio por categoría
function getGananciaCategoria(data) {
    let cantidadEventos = data.length;
    let ganancia = 0;
    data.forEach(element => {
        const estimate = element.estimate||element.assistance;
        const price = element.price;
        ganancia += (estimate * price / cantidadEventos);
    });
    if (ganancia === 0) {
        return "No events scheduled"
    } else {
        return "$" + ganancia + " average per event";
    }
}
//Calcular asistencia promedio por categoría
function getAsistenciaCategoria(data) {
    let cantidadEventos = data.length;
    let asistencia = 0;
    data.forEach(element => {
        asistencia += element.estimate||element.assistance;
    });
    if (asistencia === 0) {
        return "No events scheduled"
    } else {
        return Math.round(asistencia / cantidadEventos) + " average per event";
    }
}

// completo la primera tabla
function llenarPrimeraTabla (data){
    let container = document.getElementById("primeraTabla");
    let tableBodyHTML = "";
    const eventoMayorAsistencia = mayorAsistencia(data);
    const eventoMenorAsistencia = menorAsistencia(data);
    const eventoMayorCapacidad = mayorCapacidad (data);
    tableBodyHTML = 
        `<tr><td>Events with the highest percentaje of asistencia</td> <td>Events with the lowest percentaje of asistencia</td> <td>Events with the highest capacity</td></tr>
        <tr><td>${eventoMayorAsistencia.name}</td> <td>${eventoMenorAsistencia.name}</td> <td>${eventoMayorCapacidad.name}</td>
        <tr><td>Percentage: ${asistenciaEvento(eventoMayorAsistencia)}%</td> <td>Percentage: ${asistenciaEvento(eventoMenorAsistencia)}% </td> <td>Capacity: ${eventoMayorCapacidad.capacity}</td></tr>`
    container.innerHTML = tableBodyHTML;
}

// completo la segunda tabla 
function llenarSegundaTabla(upcomingEvents) {
    let container = document.getElementById("segundaTabla");
    listaCategoriasUpcoming(upcomingEvents)
    tableBodyHTML = ""
    listadoCategoriasUpcoming.forEach(element => {
        let eventosFiltradosFuturo = upcomingEvents.filter(event => event.category === element);
        let gananciaCategoria = getGananciaCategoria(eventosFiltradosFuturo);
        let asistenciaCategoria = getAsistenciaCategoria(eventosFiltradosFuturo);
        tableBodyHTML +=  `<tr><td>${element}</td> <td>${gananciaCategoria}</td> <td>${asistenciaCategoria}</td></tr>`
    container.innerHTML = tableBodyHTML;
              
    });
}
// completo la tercera tabla
function llenarTerceraTabla(pastEvents) {
    let container = document.getElementById("terceraTabla");
    let gananciaCategoria = ""
    let asistenciaCategoria = ""
    listaCategoriasPast(pastEvents)
    listadoCategoriasPast.forEach(element => {
        let eventosFiltradosPasado = pastEvents.filter(event => event.category === element);
        gananciaCategoria = getGananciaCategoria(eventosFiltradosPasado);
        asistenciaCategoria = getAsistenciaCategoria(eventosFiltradosPasado);
        tableBodyHTML +=  `<tr><td>${element}</td> <td>${gananciaCategoria}</td> <td>${asistenciaCategoria}</td></tr>`
    container.innerHTML = tableBodyHTML;           
    });
}
// filtro eventos del pasado
function pushearPastEvents (data){
    for(let event of data.events){
        let currentDate = new Date(data.currentDate);
        let eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            pastEvents.push(event)
            
        }
    }
}
// listo las categorias pasado
function listaCategoriasPast(pastEvents){
    
    for (evento of pastEvents) {
        if (!listadoCategoriasPast.includes(evento.category)){
            listadoCategoriasPast.push(evento.category)
        }
    }

}

// filtro eventos del futuro
function pushearUpcomingEvents (data){
    for(let event of data.events){
        let currentDate = new Date(data.currentDate);
        let eventDate = new Date(event.date);
        if (eventDate > currentDate) {
            upcomingEvents.push(event)
        }
    }
}
// listo las categorias pasado
function listaCategoriasUpcoming(upcomingEvents){
    for (evento of upcomingEvents) {
        if (!listadoCategoriasUpcoming.includes(evento.category)){
            listadoCategoriasUpcoming.push(evento.category)
        }
    }
}