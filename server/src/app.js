const path = require('path');
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error');

const api = require('./routes/api');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/v1', api);

app.use(errorMiddleware);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
