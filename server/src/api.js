const express = require('express');

const launchesRouter = require("./routes/launches/launches.router");
const planetsRouter = require("./routes/planets/planets.router");

const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

module.exports = api;