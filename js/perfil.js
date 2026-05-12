const cardContainer = document.querySelector('#card-container')
const btnPerfil = document.querySelector('#btn-perfil')

async function perfil() {
  try {
    // Recuperar el id del usuario logueado
    const id = localStorage.getItem('usuarioId')
    if (!id) {
      alert('No hay usuario logueado')
      return
    }

    // Pedir solo ese perfil al backend
    const response = await fetch(`https://digital-factory.onrender.com/api/perfil/${id}`)
    const perfil = await response.json()
    console.log(response)
    console.log(perfil)

    cardContainer.innerHTML = '' 

    const div = document.createElement('div')
    div.classList.add('card')

    div.innerHTML = `
      <div class="card-img"><img src="${perfil.img}"/></div>
      <div class="card-saludo"><h2>${perfil.saludo}</h2></div>
      <div class="card-nombre"><p>${perfil.nombre}</p></div>
      <div class="card-email"><p>${perfil.email}</p></div>
      <div class="card-fnac"><p>${perfil.fnac}</p></div>
    `
    cardContainer.append(div)
  } catch (error) {
    console.log(`Error, no se pudo traer el perfil. ${error}`)
  }
}

btnPerfil.addEventListener('click', perfil)
