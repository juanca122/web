// Variables globales
let monedas = 0;
let usuarios = { 'admin@example.com': { nombre: 'admin', clave: '1234' } }; // Usuarios predeterminados para el inicio de sesión

// Simulando inicio de sesión seguro
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let usuario = document.getElementById('usuario').value;
    let clave = document.getElementById('clave').value;

    // Verificar si el usuario y la contraseña son correctos
    if (usuarios[usuario] && usuarios[usuario].clave === clave) {
        document.getElementById('login').classList.add('hidden');
        document.getElementById('mainPage').classList.remove('hidden');
    } else {
        document.getElementById('errorLogin').classList.remove('hidden');
    }
});

// Cerrar sesión
document.getElementById('cerrarSesion').addEventListener('click', function () {
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
});

// Navegar a la página de registro
document.getElementById('registerLink').addEventListener('click', function () {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('register').classList.remove('hidden');
});

// Navegar de registro a inicio de sesión
document.getElementById('backToLogin').addEventListener('click', function () {
    document.getElementById('register').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
});

// Registro de usuario
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let nombre = document.getElementById('nombreRegistro').value;
    let email = document.getElementById('emailRegistro').value;
    let clave = document.getElementById('claveRegistro').value;

    // Guardar el usuario registrado
    if (!usuarios[email]) {
        usuarios[email] = { nombre: nombre, clave: clave };
        alert('Registro exitoso. Ya puedes iniciar sesión.');
        document.getElementById('register').classList.add('hidden');
        document.getElementById('login').classList.remove('hidden');
    } else {
        alert('Este correo ya está registrado.');
    }
});

// Recuperar contraseña
document.getElementById('forgotPassword').addEventListener('click', function () {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('recoverPassword').classList.remove('hidden');
});

// Volver de recuperación de contraseña a inicio de sesión
document.getElementById('backToLoginFromRecover').addEventListener('click', function () {
    document.getElementById('recoverPassword').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
});

// Enviar recuperación de contraseña (simulación)
document.getElementById('recoverForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let correo = document.getElementById('correoRecuperar').value;

    if (usuarios[correo]) {
        document.getElementById('mensajeRecuperacion').classList.remove('hidden');
    } else {
        alert('El correo no está registrado.');
    }
});
// Abrir el formulario de reciclaje
document.getElementById('abrirFormulario').addEventListener('click', function () {
    document.getElementById('formularioReciclaje').classList.remove('hidden');
});

// Enviar solicitud de reciclaje
document.getElementById('solicitudForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let tipoReciclaje = document.getElementById('tipoReciclaje').value;
    let ubicacion = document.getElementById('ubicacion').value;

    // Crear nueva fila para la solicitud
    let tabla = document.getElementById('listaSolicitudes');
    let nuevaFila = tabla.insertRow();
    let celdaTipo = nuevaFila.insertCell(0);
    let celdaUbicacion = nuevaFila.insertCell(1);
    let celdaAccion = nuevaFila.insertCell(2);

    celdaTipo.textContent = tipoReciclaje;
    celdaUbicacion.textContent = ubicacion;
    celdaAccion.innerHTML = '<button class="aceptarBtn">Aceptar</button>';

    // Limpiar formulario después de enviar
    document.getElementById('solicitudForm').reset();
    document.getElementById('formularioReciclaje').classList.add('hidden');
});

// Aceptar solicitud y recibir monedas
document.getElementById('listaSolicitudes').addEventListener('click', function (e) {
    if (e.target && e.target.matches('.aceptarBtn')) {
        // Incrementar las monedas del usuario
        monedas += 100;
        document.getElementById('monedasRecompensa').textContent = `Monedas: ${monedas}`;
        
        // Marcar la solicitud como aceptada
        let fila = e.target.parentElement.parentElement;
        fila.querySelector('.aceptarBtn').disabled = true;
        fila.querySelector('.aceptarBtn').textContent = 'Aceptada';

        // Simular la visualización de la ubicación en Google Maps (abriendo una nueva ventana con Google Maps)
        let ubicacion = fila.cells[1].textContent;
        let url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ubicacion)}`;
        window.open(url, '_blank');
    }
});