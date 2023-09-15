const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.port || 8000;

const MONGO_URL = 'mongodb+srv://charlesshb98:OGizEd8RoaVRiO03@cluster0.fsfa1n4.mongodb.net/nasa-db?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log("MongoDB connection ready!")
});

mongoose.connection.on('error', (error) => {
    console.error(error);
});

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log('Listening on port ', PORT);
    });
}

startServer();