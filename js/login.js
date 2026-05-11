const form = document.querySelector('#login-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const usuario = document.querySelector('#usuario').value
  const password = document.querySelector('#password').value

  try {
    const response = await fetch('http://localhost:3000/api/login', {
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
