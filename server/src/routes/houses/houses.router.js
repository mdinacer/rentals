const express = require('express');

const auth = require('../../middlewares/auth');
const { UploadMemory: upload } = require('../../services/multer');

const {
  httpListHouses,
  httpGetHousesByUser,
  httpGetHouse,
  httpCreateHouse,
  httpEditHouse,
  httpDeleteHouse,
  httpUpdateDetails,
  httpUpdatePrices,
  httpAddToFavorites,
} = require('./houses.controller');

const uploadFields = [
  {
    name: 'cover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
];

const housesRouter = express.Router();

housesRouter.get('/', httpListHouses);
housesRouter.get('/me', auth, httpGetHousesByUser);
housesRouter.get('/:slug', httpGetHouse);
housesRouter.post('/', [auth, upload.fields(uploadFields)], httpCreateHouse);
housesRouter.put('/:id', [auth, upload.fields(uploadFields)], httpEditHouse);
housesRouter.put('/:id/details', auth, httpUpdateDetails);
housesRouter.put('/:id/prices', auth, httpUpdatePrices);
housesRouter.delete('/:id', auth, httpDeleteHouse);
housesRouter.put('/:id/fav', auth, httpAddToFavorites);

module.exports = housesRouter;
