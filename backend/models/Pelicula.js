const mongoose = require('mongoose');


const funcionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    sala: {
        type: String,
        required: true
    },
    formato: {
        type: String,
        required: true,
        enum: ['2D', '3D', 'IMAX', 'Premier']
    }
});


const peliculaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    poster: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true,
        enum: ['accion', 'comedia', 'aventura', 'terror', 'drama', 'ciencia-ficcion']
    },
    sinopsis: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    funciones: [funcionSchema]
}, {
    timestamps: true 
});


const Pelicula = mongoose.model('Pelicula', peliculaSchema);

module.exports = Pelicula;