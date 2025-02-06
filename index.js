const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

console.log(process.env);

// Crate Express server
const app = express();

// Database Conection 
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use(express.static('public'));

// Read and parse of body (MIDDLEWARE)
app.use(express.json());

// Routes
// TODO : auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos

// List to uests
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} `);
})