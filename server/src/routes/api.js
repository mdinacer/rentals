const express = require('express');
const { DeleteImage } = require('../services/cloudinary');

const authRouter = require('./auth/auth.router');
const usersRouter = require('./users/users.router');
const housesRouter = require('./houses/houses.router');
const rentsRouter = require('./rents/rents.router');

const api = express.Router();

api.use('/auth', authRouter);
api.use('/users', usersRouter);
api.use('/houses', housesRouter);
api.use('/rents', rentsRouter);

api.delete('images/:id', async (req, res) => {
  const result = await DeleteImage(id);
  res.json(result);
});

module.exports = api;
