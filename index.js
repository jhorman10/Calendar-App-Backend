/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */

const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
