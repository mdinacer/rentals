const express = require('express');
const auth = require('../../middlewares/auth');
const { httpCreatePayment } = require('./payments.controller');

const paymentsRouter = express.Router();

paymentsRouter.post('/:id', auth, httpCreatePayment);

module.exports = paymentsRouter;
