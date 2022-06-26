const path = require('path');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/error');

const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

app.use(
  cors({
    origin: '*', //'http://localhost:3000/',
    optionsSuccessStatus: 200,
    exposedHeaders: ['Pagination'],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
    // preflightContinue: true,
  })
);

// app.use(
//   cors({
//     exposedHeaders: ['Pagination'],
//   })
// );

app.use(morgan('combined'));

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/v1', api);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use(errorMiddleware);

module.exports = app;
