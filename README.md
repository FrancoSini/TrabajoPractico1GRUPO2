# TRABAJO PRÁCTICO N°3 (FRONT-END):

## Digital Factory

Sitio web dinámico para una empresa de servicios tecnológicos que integra un front-end desarrollado con etiquetas semánticas y estilos CSS con un servidor back-end en Node.js y Express para la consulta y gestión de datos en tiempo real.

![alt text](image-1.png)

## GRUPO N°2:
- Franco Sinigaglia
- Joaquin Pignotti
- Lucia Aguero
- Mateo Barrera
- Ricardo Herbas
- Ignacio Painenahuel Luna


## Tecnologías utilizadas: HTML, CSS, Javascript, Node.js, Express y Render

## Estructura del proyecto
``` 
/proyecto
│
├── index.html
├── README.md
│
├── /css
│   └── style.css
│
├── /pages
│   ├── contacto.html
│   ├── equipo.html
│   ├── faq.html
│   ├── login.html
│   ├── pedido.html
│   ├── perfil.html
│   └── servicios.html
│
└── /js
├── equipo.js
├── login.js
├── perfil.js
└── servicios.js
```

## Lógica principal

El sistema interactúa de manera asíncrona con una API REST externa alojada en Render utilizando `fetch` con la sintaxis de `async/await`. Al iniciar la página de servicios o de equipo, se realizan peticiones HTTP GET automáticas para renderizar los elementos de forma dinámica a partir de las respuestas JSON del servidor. Por otro lado, la sección de ingreso captura el evento `submit` del formulario para validar las credenciales del usuario mediante una petición POST, almacenando el identificador obtenido en `localStorage` para persistir la sesión y permitir la posterior recuperación personalizada de los datos del panel de perfil.

---


## Funcionalidades

 ```cargarEquipo() ```

Descripción: Obtiene de forma asíncrona el listado de integrantes de la empresa desde el servidor y los renderiza dentro del contenedor de tarjetas del DOM.
``` javascript
async function cargarEquipo() {
try {
    // Pide los datos del equipo al backend
    const response = await fetch('[https://digital-factory.onrender.com/equipo](https://digital-factory.onrender.com/equipo)')
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
        <p>${integrante.descripcion}</p>
    `
    cardContainer.append(div)
    })

} catch (error) {
    console.log(`Error, no se pudo traer el equipo. ${error}`)
}
} 
```

Realiza una petición de tipo GET mediante fetch al endpoint de equipo. Limpia el contenido previo del elemento HTML utilizando `innerHTML = ''` y procesa los datos obtenidos con un bucle `forEach`. Crea dinámicamente elementos div dotados de la clase integrante, les inyecta plantillas de cadenas de texto con las propiedades img, nombre y descripcion del objeto, y finalmente los incorpora al DOM usando `.append()`

```servicios() ```

Descripción: Consulta asíncronamente el catálogo de servicios ofrecidos por la organización y genera dinámicamente las tarjetas de presentación en la interfaz de usuario.
```javaScript
async function servicios() {
  try {
    const response = await fetch('[https://digital-factory.onrender.com/servicios](https://digital-factory.onrender.com/servicios)')
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
        <div class="card-descripcion"><p>${servicio.desc}</p></div>
      `
      cardContainer.append(div)
    })
  } catch (error) {
    console.log(
      `Error, no se pudieron traer los datos de los servicios. ${error}`
    )
  }
}
```
Se vincula mediante un escuchador de eventos al clic del botón correspondiente. Consume el endpoint de servicios, vacía el contenedor principal y procesa el arreglo recibido instanciando elementos contenedores con la clase card. Define la estructura semántica de imágenes, costos y detalles comerciales, y los anexa de manera progresiva a la interfaz gráfica

``` perfil() ```

Descripción: Recupera los datos de perfil correspondientes al usuario que se encuentra actualmente autenticado en la sesión del navegador

``` javascript
async function perfil() {
  try {
    // Recuperar el id del usuario logueado
    const id = localStorage.getItem('usuarioId')
    if (!id) {
      alert('No hay usuario logueado')
      return
    }

    // Pedir solo ese perfil al backend
    const response = await fetch(`https://digital-factory.onrender.com/perfil/${id}`)
    const perfil = await response.json()
    console.log(response)
    console.log(perfil)

    cardContainer.innerHTML = '' 

    const div = document.createElement('div')
    div.classList.add('card')

    div.innerHTML = `
      <div class="card-saludo"><h2>${perfil.saludo}</h2></div>
      <div class="card-nombre"><p>${perfil.nombre}</p></div>
      <div class="card-profesion"><p>${perfil.profesion}</p></div>
    `
    cardContainer.append(div)
  } catch (error) {
    console.log(`Error, no se pudo traer el perfil. ${error}`)
  }
}
```
Busca la clave `usuarioId` almacenada de forma persistente a nivel local por medio del método `localStorage.getItem()`. Si existe el identificador, concatena el parámetro en la URL del recurso (/perfil/${id}) para ejecutar el fetch. Por último, limpia el panel e introduce una tarjeta única estructurando informativamente los campos de bienvenida, identidad personal y ocupación profesional del usuario devuelto

``` Formulario EventListener ('submit') ```

Descripción: Administra el envío del formulario de acceso, transmitiendo de manera segura los datos hacia el servidor y controlando la redirección por inicio de sesión exitoso
``` javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const usuario = document.querySelector('#usuario').value
  const password = document.querySelector('#password').value

  try {
    const response = await fetch('[https://digital-factory.onrender.com/login](https://digital-factory.onrender.com/login)', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    })

    if (response.ok) {
      const perfil = await response.json()
      console.log('Login correcto:', perfil)
      localStorage.setItem('usuarioId', perfil.id)

      window.location.href = 'perfil.html'
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  } catch (error) {
    console.error('Error en login:', error)
  }
})
```
Interrumpe la recarga predeterminada de la página mediante el método `e.preventDefault()`. Extrae los valores ingresados en los campos de credenciales y ejecuta una petición HTTP POST configurando las cabeceras para el envío de objetos JSON. Si las credenciales son válidas, decodifica la respuesta para guardar el id correspondiente en el almacenamiento local y altera la propiedad `window.location.href` para redirigir al usuario hacia la interfaz privada de su panel
