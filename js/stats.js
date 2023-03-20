

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let data;
let resultados = []
let past;



async function getEventData(){
    try {
        const response = await fetch(urlApi);

        await response.json()
            .then(json => {
                data = json;
                listadoPorAsistencia()
            })

    } catch (error){

    }
}
getEventData()


function asistenciaEvento(evento) {
    let capacidad = evento.capacity;
    let asistencia = evento.assistance;
    if (!asistencia) {
        asistencia = evento.estimate;
    }
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

function listadoPorAsistencia (){
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

// await import pastEvents from "./past.js";
// (async ()=>{
//     past = await import ("./past.js");


// })

async function gananciaPasado() {
    // let past = await import ("./past.js");
    await import ("./past.js")
    .then(past => {
        console.log(past.pastEvents)
        if (past.pastEvents.length > 0) {
            console.log("no cargo")
        }
        else {
            // no entra al for
        for (let evento of past.pastEvents){
            console.log(evento.name)
            console.log("hola")
        } 
    }
    })

}


gananciaPasado()