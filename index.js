const path = require( 'path' );

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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Dirname is where our application is pointed to
app.use( '*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ));
});

// List to requests
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} `);
})