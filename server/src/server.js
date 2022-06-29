const http = require('http');
const https = require('https');

require('express-async-errors');
require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const logger = require('./services/logger');
const socketApi = require('./services/socket');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
socketApi.io.attach(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    //allowedHeaders: ['my-custom-header'],
    //credentials: true,
  },
});

//require('./services/socket').connectSocket(server);

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
