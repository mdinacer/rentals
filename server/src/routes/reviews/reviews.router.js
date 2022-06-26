const express = require('express');
const auth = require('../../middlewares/auth');

const {
  httpGetReviewsByHouse,
  httpGetReviewsByUser,
  httpCreateReview,
  httpEditReview,
  httpDeleteReview,
} = require('./reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.get('/:id', httpGetReviewsByHouse);
reviewsRouter.get('/me', auth, httpGetReviewsByUser);
reviewsRouter.post('/:id', auth, httpCreateReview);
reviewsRouter.put('/:id', auth, httpEditReview);
reviewsRouter.delete('/:id', auth, httpDeleteReview);

module.exports = reviewsRouter;
