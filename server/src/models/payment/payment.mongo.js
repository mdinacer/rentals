const mongoose = require('mongoose');
const Joi = require('joi');
const { number, boolean } = require('joi');

const paymentSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now(),
  },

  paymentDate: {
    type: Date,
    required: true,
  },

  amount: {
    type: Number,
    min: 0,
    default: 0,
  },

  received: {
    type: Boolean,
    default: false,
  },

  rent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Rent',
  },

  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },

  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },

  type: {
    type: String,
    enum: ['cash', 'card', 'bank'],
    default: 'cash',
  },
});

function validatePayment(values) {
  const schema = Joi.object({
    paymentDate: Joi.date().required(),
    amount: Joi.number().min(0).required(),
    type: Joi.string().valid('cash', 'card', 'bank').required(),
  });

  return schema.validate(values);
}

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  Payment,
  validatePayment,
};
