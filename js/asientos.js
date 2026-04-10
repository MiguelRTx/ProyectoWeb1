const datosReserva = JSON.parse(localStorage.getItem('datosReserva'));

if (!datosReserva) {
    window.location.href = '../index.html';
}

const FILAS = 8;
const ASIENTOS_POR_FILA = 8;
const PRECIO_ASIENTO = 15.00;

document.getElementById('titulo-pelicula').textContent = datosReserva.pelicula.titulo;
document.getElementById('horario-funcion').textContent = `${datosReserva.fecha} - ${datosReserva.funcion.hora} - ${datosReserva.funcion.sala}`;


let asientosSeleccionados = [];

function generarAsientosOcupados() {
    const ocupados = [];
    const cantidadOcupados = Math.floor(Math.random() * 20) + 10;
    
    while (ocupados.length < cantidadOcupados) {
        const fila = Math.floor(Math.random() * FILAS);
        const numero = Math.floor(Math.random() * ASIENTOS_POR_FILA);
        const asiento = `${String.fromCharCode(65 + fila)}${numero + 1}`;
        
        if (!ocupados.includes(asiento)) {
            ocupados.push(asiento);
        }
    }
    
    return ocupados;
}

const asientosOcupados = generarAsientosOcupados();

function crearGridAsientos() {
    const gridAsientos = document.getElementById('grid-asientos');
    gridAsientos.innerHTML = '';

    for (let fila = 0; fila < FILAS; fila++) {
        const letraFila = String.fromCharCode(65 + fila);
        
        const etiquetaIzq = document.createElement('div');
        etiquetaIzq.className = 'etiqueta-fila';
        etiquetaIzq.textContent = letraFila;
        gridAsientos.appendChild(etiquetaIzq);

        for (let numero = 1; numero <= ASIENTOS_POR_FILA; numero++) {
            const idAsiento = `${letraFila}${numero}`;
            const asiento = document.createElement('div');
            asiento.className = 'asiento';
            asiento.dataset.asiento = idAsiento;
            
            if (asientosOcupados.includes(idAsiento)) {
                asiento.classList.add('ocupado');
            } else {
                asiento.classList.add('disponible');
                asiento.addEventListener('click', () => toggleAsiento(idAsiento, asiento));
            }
            
            gridAsientos.appendChild(asiento);
        }
        
        const etiquetaDer = document.createElement('div');
        etiquetaDer.className = 'etiqueta-fila';
        etiquetaDer.textContent = letraFila;
        gridAsientos.appendChild(etiquetaDer);
    }
}

function toggleAsiento(idAsiento, elementoAsiento) {
    if (elementoAsiento.classList.contains('seleccionado')) {
        elementoAsiento.classList.remove('seleccionado');
        elementoAsiento.classList.add('disponible');
        asientosSeleccionados = asientosSeleccionados.filter(a => a !== idAsiento);
    } else {
        elementoAsiento.classList.remove('disponible');
        elementoAsiento.classList.add('seleccionado');
        asientosSeleccionados.push(idAsiento);
    }
    
    actualizarResumen();
}

function actualizarResumen() {
    const spanAsientos = document.getElementById('asientos-seleccionados');
    const spanPrecio = document.getElementById('precio-total');
    const botonContinuar = document.getElementById('boton-continuar');
    
    if (asientosSeleccionados.length === 0) {
        spanAsientos.textContent = '-';
        spanPrecio.textContent = '$0.00';
        botonContinuar.disabled = true;
    } else {
        spanAsientos.textContent = asientosSeleccionados.sort().join(', ');
        const total = asientosSeleccionados.length * PRECIO_ASIENTO;
        spanPrecio.textContent = `$${total.toFixed(2)}`;
        botonContinuar.disabled = false;
    }
}

document.getElementById('boton-continuar').addEventListener('click', () => {
    if (asientosSeleccionados.length > 0) {
        datosReserva.asientos = asientosSeleccionados;
        datosReserva.precioTotal = asientosSeleccionados.length * PRECIO_ASIENTO;
        localStorage.setItem('datosReserva', JSON.stringify(datosReserva));
        window.location.href = 'compra.html';
    }
});

crearGridAsientos();
actualizarResumen();