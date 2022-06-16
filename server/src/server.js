const http = require('http');
require('express-async-errors');
require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const logger = require('./services/logger');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();

    require('./services/validation')();

    if (!process.env.JWT_KEY) {
        logger.error('FATAL ERROR: JWT private key not defined.');
        process.exit(1);
    }

    server.listen(PORT, () => {
        logger.info(`Listening on port ${PORT}...`);
    });
}

startServer();
