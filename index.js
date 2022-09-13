/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */

const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');

const app = express();

//DB Connection
dbConnection();

app.use(express.static('public'));

//Read and parse
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
