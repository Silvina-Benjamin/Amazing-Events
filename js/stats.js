let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let past = './past.js'
let resultados = []




async function getEventData(){
    try {
        const response = await fetch(urlApi);

        await response.json()
            .then(json => {
                data = json;
                llenarPrimeraTabla()
                llenarSegundaTabla();
                llenarTerceraTabla();

            })
    } catch (error){

    }
}
getEventData()


function asistenciaEvento(evento) {
    let capacidad = evento.capacity;
    let asistencia = evento.assistance;
    let porcentajeAsistencia = asistencia/capacidad * 100;
    return porcentajeAsistencia;
}

function mayorAsistencia() {
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

function menorAsistencia() {
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

function mayorCapacidad(){
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

function llenarPrimeraTabla (){
    let container = document.getElementById("primeraTabla");
    let tableBodyHTML = "";
    eventoMayorAsistencia = mayorAsistencia();
    eventoMenorAsistencia = menorAsistencia();
    eventoMayorCapacidad = mayorCapacidad ();
    tableBodyHTML = 
        `<tr><td>Events with the highest percentaje of attendance</td> <td>Events with the lowest percentaje of attendance</td> <td>Events with the highest capacity</td></tr>
        <tr><td>${eventoMayorAsistencia.name}</td> <td>${eventoMenorAsistencia.name}</td> <td>${eventoMayorCapacidad.name}</td>
        <tr><td>Percentage: ${asistenciaEvento(eventoMayorAsistencia)}%</td> <td>Percentage: ${asistenciaEvento(eventoMenorAsistencia)}% </td> <td>Capacity: ${eventoMayorCapacidad.capacity}</td></tr>`
    container.innerHTML = tableBodyHTML;
}

function llenarSegundaTabla(data) {
    let container = document.getElementById("segundaTabla");
    eventCategories.forEach(element => {
        let eventosFiltradosFuturo = data.filter(event => event.category === element);
        let gananciaCategoria = getGananciaCategoria(eventosFiltradosFuturo);
        let asistenciaCategoria = getAsistenciaCategoria(eventosFiltradosFuturo);
        tableBodyHTML =  `<tr><td>${element}</td> <td>${gananciaCategoria}</td> <td>${asistenciaCategoria}</td></tr>`
    container.innerHTML = tableBodyHTML;
              
    });
    //Calcular ingresos promedio por categoría
 function getGananciaCategoria(data) {
    let eventsAmount = data.length;
    let revenue = 0;
    data.forEach(element => {
        const estimate = parseInt(element.estimate||element.assistance);
        const price = parseInt(element.price);
        revenue += (estimate * price / eventsAmount);
    });
    if (revenue === 0) {
        return "No events scheduled"
    } else {
        return "$" + Math.round(revenue) + " average per event";
    }
}
//Calcular asistencia promedio por categoría
function getAsistenciaCategoria(data) {
    let eventsAmount = data.length;
    let attendance = 0;
    data.forEach(element => {
        attendance += parseInt(element.estimate||element.assistance);
    });
    if (attendance === 0) {
        return "No events scheduled"
    } else {
        return Math.round(attendance / eventsAmount) + " average per event";
    }
}
//Poblar tercera tabla
function llenarTerceraTabla(data) {
    let container = document.getElementById("terceraTabla");
    eventCategories.forEach(element => {
        let eventosFiltradosPasado = data.filter(event => event.category === element);
        let gananciaCategoria = getGananciaCategoria(eventosFiltradosPasado);
        let asistenciaCategoria = getAsistenciaCategoria(eventosFiltradosPasado);
        tableBodyHTML =  `<tr><td>${element}</td> <td>${gananciaCategoria}</td> <td>${asistenciaCategoria}</td></tr>`
    container.innerHTML = tableBodyHTML;           
    });
}

}