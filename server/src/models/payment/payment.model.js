const { Payment, validatePayment } = require('./payment.mongo');
const { Rent } = require('../rent/rent.mongo');
const { init, Task } = require('fawn');

init(process.env.MONGO_URL, 'tempPaymentsCollection');

async function getPaymentsByUser() {}

async function createPayment(user, rentId, data) {
  validate(data);

  const rent = await Rent.findOne({
    _id: rentId,
    owner: user._id,
    accepted: true,
  });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  let payment = new Payment({
    ...data,
    owner: rent.owner,
    customer: rent.client,
  });

  //await payment.save();

  await new Task()
    .save('payments', payment)
    .update('rents', { _id: rent._id }, { $push: { payments: payment._id } })
    .run();

  return payment;
}

function validate(values) {
  const { error: validationError } = validatePayment(values);

  if (validationError) {
    const error = Error(validationError.details[0].message);
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  createPayment,
};
