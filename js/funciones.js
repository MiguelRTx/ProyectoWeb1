const parametrosURL = new URLSearchParams(window.location.search);
const idPelicula = parseInt(parametrosURL.get('id'));
const peliculas = JSON.parse(localStorage.getItem('peliculas'));
const peliculaSeleccionada = peliculas.find(p => p.id === idPelicula);

if (!peliculaSeleccionada) {
    window.location.href = '../index.html';
}


document.getElementById('poster-imagen').src = `../${peliculaSeleccionada.poster}`;
document.getElementById('titulo-pelicula').textContent = peliculaSeleccionada.titulo;
document.getElementById('sinopsis-pelicula').textContent = peliculaSeleccionada.sinopsis;
 

const tagsContenedor = document.getElementById('tags-contenedor');
const tagDuracion = document.createElement('span');
tagDuracion.className = 'tag';
tagDuracion.textContent = peliculaSeleccionada.duracion;

const tagGenero = document.createElement('span');
tagGenero.className = 'tag';
tagGenero.textContent = peliculaSeleccionada.genero.charAt(0).toUpperCase() + peliculaSeleccionada.genero.slice(1);

tagsContenedor.appendChild(tagDuracion);
tagsContenedor.appendChild(tagGenero);


const fechaActual = new Date();
const opcionesFecha = { weekday: 'long', 
                        day: 'numeric', 
                        month: 'short' };
document.getElementById('fecha-actual').textContent = fechaActual.toLocaleDateString('es-ES', opcionesFecha);


const funcionesPorFormato = {};
peliculaSeleccionada.funciones.forEach(funcion => {
    if (!funcionesPorFormato[funcion.formato]) {
        funcionesPorFormato[funcion.formato] = [];
    }
    funcionesPorFormato[funcion.formato].push(funcion);
});

const contenedorFunciones = document.getElementById('contenedor-funciones');
Object.keys(funcionesPorFormato).forEach(formato => {
    const seccionFormato = document.createElement('div');
    seccionFormato.className = 'categorias-shows';
    
    const nombreCategoria = document.createElement('div');
    nombreCategoria.className = 'categoria-nombre';
    nombreCategoria.textContent = formato;
    
    const gridFunciones = document.createElement('div');
    gridFunciones.className = 'showtimes-grid';
    
    funcionesPorFormato[formato].forEach(funcion => {
        const boton = document.createElement('button');
        boton.className = 'showtime-btn';
        boton.textContent = funcion.hora;
        boton.onclick = () => seleccionarFuncion(funcion);
        gridFunciones.appendChild(boton);
    });
    
    seccionFormato.appendChild(nombreCategoria);
    seccionFormato.appendChild(gridFunciones);
    contenedorFunciones.appendChild(seccionFormato);
});

function seleccionarFuncion(funcion) {
    const datosReserva = {
        pelicula: peliculaSeleccionada,
        funcion: funcion,
        fecha: fechaActual.toLocaleDateString('es-ES')
    };
    localStorage.setItem('datosReserva', JSON.stringify(datosReserva));
    
    window.location.href = 'asientos.html';
}