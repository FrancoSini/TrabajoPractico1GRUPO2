const cardContainer = document.querySelector('#card-container')
const btnServicios = document.querySelector('#btn-servicios')

async function servicios() {
  try {
    const response = await fetch('https://digital-factory.onrender.com/api/servicios')
    const data = await response.json()
    console.log(response)
    console.log(data)

    cardContainer.innerHTML = '' 
    data.forEach((servicio) => {
      const div = document.createElement('div')
      div.classList.add('card')

      div.innerHTML = `
        <div class="card-img"> <img src="${servicio.img}"/></div>
        <div class="card-valor"><h2>${servicio.precio}</h2></div>
        <div class="card-descripcion"><p>${servicio.descripcion}</p></div>
      `
      cardContainer.append(div)
    })
  } catch (error) {
    console.log(
      `Error, no se pudieron traer los datos de los servicios. ${error}`
    )
  }
}

btnServicios.addEventListener('click', servicios)
