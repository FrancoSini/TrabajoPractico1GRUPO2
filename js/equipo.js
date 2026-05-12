const cardContainer = document.querySelector('#card-container')

async function cargarEquipo() {
try {
    // Pide los datos del equipo al backend
    const response = await fetch('http://localhost:3000/api/equipo')
    const integrantes = await response.json()
    console.log(response)
    console.log(integrantes)

    cardContainer.innerHTML = '' 

    // Recorre el array de integrantes que devolvió el backend
    integrantes.forEach(integrante => {
    const div = document.createElement('div')
    div.classList.add('integrante')

    div.innerHTML = `
        <img src="${integrante.img}" alt="Foto de ${integrante.nombre}">
        <h2>${integrante.nombre}</h2>
        <p>${integrante.rol}</p>
    `
    cardContainer.append(div)
    })

} catch (error) {
    console.log(`Error, no se pudo traer el equipo. ${error}`)
}
}

// Ejecuta la función directamente al cargar el script
cargarEquipo()