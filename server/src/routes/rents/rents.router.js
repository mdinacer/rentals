const express = require('express');

const auth = require('../../middlewares/auth');

const {
  httpListRents,
  httpGetActiveRequest,
  httpCreateRent,
  httpEditRent,
  httpAcceptRent,
  httpCancelRent,
  httpDeleteRent,
} = require('./rents.controller');

const rentsRouter = express.Router();

rentsRouter.get('/', httpListRents);
rentsRouter.get('/:id/active', auth, httpGetActiveRequest); //id: HouseId
rentsRouter.post('/:id', auth, httpCreateRent); //id: HouseId
rentsRouter.put('/:id', auth, httpEditRent); //id: RentId
rentsRouter.put('/:id/accept', auth, httpAcceptRent); //id: RentId
rentsRouter.put('/:id/cancel', auth, httpCancelRent); //id: RentId
rentsRouter.delete('/:id', auth, httpDeleteRent); //id: RentId

module.exports = rentsRouter;
