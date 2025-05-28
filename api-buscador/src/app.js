const express = require('express');
const cors = require('cors');
const buscarRouter = require('./routers/buscar.routers');
const errorHandling = require('./error/errorHandling');

const app = express();
app.use(cors());
app.use(express.json());

app.use(buscarRouter);
app.use(errorHandling.errorHandling);

module.exports = app;

