for(let event of data.events){
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

    if (eventDate > currentDate) {
        console.log("evento futuro: " + event.name)
    }

}
