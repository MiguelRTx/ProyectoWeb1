const datosReserva = JSON.parse(localStorage.getItem('datosReserva'));

if (!datosReserva || !datosReserva.asientos) {
    window.location.href = '../index.html';
}

const TARIFA_SERVICIO = 3.50;

document.getElementById('poster-pelicula').src = `../${datosReserva.pelicula.poster}`;
document.getElementById('titulo-pelicula').textContent = datosReserva.pelicula.titulo;
document.getElementById('sala-funcion').textContent = `${datosReserva.funcion.sala}, Screen 7`;
document.getElementById('fecha-hora').textContent = `${datosReserva.fecha} | ${datosReserva.funcion.hora}`;
document.getElementById('asientos-compra').textContent = `${datosReserva.asientos.length} Seats: ${datosReserva.asientos.join(', ')}`;

const precioTickets = datosReserva.precioTotal;
document.getElementById('precio-tickets').textContent = `$${precioTickets.toFixed(2)} (${datosReserva.asientos.length} x $15.00)`;
document.getElementById('tarifa-servicio').textContent = `$${TARIFA_SERVICIO.toFixed(2)}`;

const totalFinal = precioTickets + TARIFA_SERVICIO;
document.getElementById('total-pagar').textContent = `$${totalFinal.toFixed(2)}`;


let tiempoRestante = 300;

function actualizarTemporizador() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    
    document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
    
    if (tiempoRestante > 0) {
        tiempoRestante--;
    } else {
        alert('El tiempo ha expirado.');
        window.location.href = 'asientos.html';
    }
}

setInterval(actualizarTemporizador, 1000);


document.getElementById('formulario-compra').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombreCompleto = document.getElementById('nombre-completo').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    
  
    document.getElementById('nombre-cliente').textContent = nombreCompleto;
    document.getElementById('ticket-pelicula').textContent = datosReserva.pelicula.titulo;
    document.getElementById('ticket-fecha').textContent = `${datosReserva.fecha} - ${datosReserva.funcion.hora}`;
    document.getElementById('ticket-asientos').textContent = datosReserva.asientos.join(', ');
    document.getElementById('ticket-email').textContent = email;
    document.getElementById('ticket-telefono').textContent = telefono || 'No proporcionado';
    document.getElementById('ticket-total').textContent = `$${totalFinal.toFixed(2)}`;
    
    const modal = document.getElementById('modal-confirmacion');
    modal.classList.add('modal-visible');
    
    localStorage.removeItem('datosReserva');
});