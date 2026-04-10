const API_URL = 'http://localhost:5000/api/peliculas';

let peliculas = [];

async function obtenerPeliculas() {
    try {
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
            throw new Error('Error al obtener películas del servidor');
        }
        
        peliculas = await respuesta.json();
        localStorage.setItem('peliculas', JSON.stringify(peliculas));
        cargarPeliculas(peliculas);
        
    } catch (error) {
        console.error('Error:', error);
        const peliculasGuardadas = localStorage.getItem('peliculas');
        if (peliculasGuardadas) {
            peliculas = JSON.parse(peliculasGuardadas);
            cargarPeliculas(peliculas);
            console.log('Cargando películas desde localStorage (modo offline)');
        } else {
            mostrarError(); 
        }
    }
}

function mostrarError() {
    const contenedor = document.getElementById('contenedor-peliculas');
    contenedor.innerHTML = '';
    
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-contenedor';
    
    const mensajeError = document.createElement('p');
    mensajeError.className = 'mensaje-error';
    mensajeError.textContent = 'No se pudieron cargar las películas';
    
    const mensajeDetalle = document.createElement('p');
    mensajeDetalle.className = 'mensaje-detalle';
    mensajeDetalle.textContent = 'Verifica que el servidor esté corriendo en http://localhost:5000';
    
    mensajeDiv.appendChild(mensajeError);
    mensajeDiv.appendChild(mensajeDetalle);
    contenedor.appendChild(mensajeDiv);
}

function cargarPeliculas(peliculasFiltradas = peliculas) {
    const contenedor = document.getElementById('contenedor-peliculas');
    contenedor.innerHTML = '';

    if (peliculasFiltradas.length === 0) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'mensaje-contenedor';
        
        const mensajeVacio = document.createElement('p');
        mensajeVacio.className = 'mensaje-vacio';
        mensajeVacio.textContent = 'No se encontraron películas';
        
        mensajeDiv.appendChild(mensajeVacio);
        contenedor.appendChild(mensajeDiv);
        return;
    }

    peliculasFiltradas.forEach(pelicula => {
        const tarjeta = document.createElement('a');
        tarjeta.href = `html/funcion.html?id=${pelicula.id}`;
        
        const tarjetaDiv = document.createElement('div');
        tarjetaDiv.className = 'tarjeta-pelicula';
        
        const img = document.createElement('img');
        img.src = pelicula.poster;
        img.alt = pelicula.titulo;
        
        const nombreDiv = document.createElement('div');
        nombreDiv.className = 'nombre-pelicula';
        nombreDiv.textContent = pelicula.titulo;
        
        tarjetaDiv.appendChild(img);
        tarjetaDiv.appendChild(nombreDiv);
        tarjeta.appendChild(tarjetaDiv);
        contenedor.appendChild(tarjeta);
    });
}

function buscarPeliculas() {
    const textoBusqueda = document.getElementById('buscar-titulo').value.toLowerCase();
    const generoSeleccionado = document.getElementById('filtro-genero').value;

    const peliculasFiltradas = peliculas.filter(pelicula => {
        const coincideTitulo = pelicula.titulo.toLowerCase().includes(textoBusqueda);
        const coincideGenero = !generoSeleccionado || pelicula.genero === generoSeleccionado;
        return coincideTitulo && coincideGenero;
    });

    cargarPeliculas(peliculasFiltradas);
}
document.getElementById('buscar-titulo').addEventListener('input', buscarPeliculas);
document.getElementById('filtro-genero').addEventListener('change', buscarPeliculas);
obtenerPeliculas();