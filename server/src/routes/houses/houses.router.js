const express = require('express');

const auth = require('../../middlewares/auth');
const { UploadMemory: upload } = require('../../services/multer');

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

const {
  httpListHouses,
  httpGetHouse,
  httpCreateHouse,
  httpEditHouse,
  httpDeleteHouse,
  httpUpdateDetails,
  httpUpdatePrices,
} = require('./houses.controller');

const housesRouter = express.Router();

housesRouter.get('/', httpListHouses);
housesRouter.get('/:slug', httpGetHouse);
housesRouter.post('/', [auth, upload.fields(uploadFields)], httpCreateHouse);
housesRouter.put('/:slug', [auth, upload.fields(uploadFields)], httpEditHouse);
housesRouter.put('/:slug/details', auth, httpUpdateDetails);
housesRouter.put('/:slug/prices', auth, httpUpdatePrices);
housesRouter.delete('/:slug', auth, httpDeleteHouse);

module.exports = housesRouter;
