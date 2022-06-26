const express = require('express');
const { DeleteImage } = require('../services/cloudinary');

const authRouter = require('./auth/auth.router');
const usersRouter = require('./users/users.router');
const housesRouter = require('./houses/houses.router');
const rentsRouter = require('./rents/rents.router');
const profilesRouter = require('./profiles/profiles.router');
const reviewsRouter = require('./reviews/reviews.router');

const api = express.Router();

api.use('/auth', authRouter);
api.use('/users', usersRouter);
api.use('/profiles', profilesRouter);
api.use('/houses', housesRouter);
api.use('/rents', rentsRouter);
api.use('/reviews', reviewsRouter);

api.delete('images/:id', async (req, res) => {
  const result = await DeleteImage(id);
  res.json(result);
});

module.exports = api;
