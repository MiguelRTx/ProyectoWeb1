const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('MongoDB conectado exitosamente');
        console.log(`Base de datos: ${mongoose.connection.name}`);
        
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log('Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error de conexión de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose desconectado de MongoDB');
});


process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Conexión de Mongoose cerrada');
    process.exit(0);
});

module.exports = conectarDB;