const express = require('express');

const auth = require('../../middlewares/auth');

const {
  httpListRents,
  //httpGetRent,
  httpCreateRent,
  httpAcceptRent,
  httpDeleteRent,
  // httpEditRent,
  // httpDeleteRent,
  // httpUpdateDetails,
  // httpUpdatePrices,
} = require('./rents.controller');

const rentsRouter = express.Router();

rentsRouter.get('/', httpListRents);
//rentsRouter.get('/:slug', httpGetRent);
rentsRouter.post('/:slug', auth, httpCreateRent);
rentsRouter.put('/:id/accept', auth, httpAcceptRent);
rentsRouter.delete('/:id', auth, httpDeleteRent);
// rentsRouter.put('/:slug', [auth, upload.fields(uploadFields)], httpEditRent);
// rentsRouter.put('/:slug/details', auth, httpUpdateDetails);
// rentsRouter.put('/:slug/prices', auth, httpUpdatePrices);
// rentsRouter.delete('/:slug', auth, httpDeleteRent);

module.exports = rentsRouter;
