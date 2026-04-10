const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');

dotenv.config();
const app = express();
conectarDB();

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/api/peliculas', require('./routes/peliculas'));
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de CineWeb funcionando correctamente' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api/peliculas`);
});