const express = require('express');
require('dotenv').config();

console.log(process.env);

// Crear el servidor de express
const app = express();

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body (MIDDLEWARE)
app.use(express.json());

// Rutas
// TODO : auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos

// Escuchar las peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT} `);
})