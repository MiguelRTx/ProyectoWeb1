const express = require('express');
const router = express.Router();
const Pelicula = require('../models/Pelicula');


router.get('/', async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ mensaje: 'Error al obtener películas', error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findOne({ id: req.params.id });
        
        if (!pelicula) {
            return res.status(404).json({ mensaje: 'Película no encontrada' });
        }
        
        res.json(pelicula);
    } catch (error) {
        console.error('Error al obtener película:', error);
        res.status(500).json({ mensaje: 'Error al obtener película', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevaPelicula = new Pelicula(req.body);
        const peliculaGuardada = await nuevaPelicula.save();
        res.status(201).json(peliculaGuardada);
    } catch (error) {
        console.error('Error al crear película:', error);
        res.status(400).json({ mensaje: 'Error al crear película', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findOneAndDelete({ id: req.params.id });
        
        if (!pelicula) {
            return res.status(404).json({ mensaje: 'Película no encontrada' });
        }
        
        res.json({ mensaje: 'Película eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar película:', error);
        res.status(500).json({ mensaje: 'Error al eliminar película', error: error.message });
    }
});

module.exports = router;