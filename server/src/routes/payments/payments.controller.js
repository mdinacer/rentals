const { createPayment } = require('../../models/payment/payment.model');

async function httpCreatePayment(req, res) {
  console.log(req.body);
  const rentId = req.params.id;
  const data = req.body;
  const result = await createPayment(req.user, rentId, data);
  return res.status(201).json(result);
}

module.exports = {
  httpCreatePayment,
};
