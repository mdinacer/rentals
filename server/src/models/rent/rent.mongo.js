const mongoose = require('mongoose');
const Joi = require('joi');

const rentSchema = new mongoose.Schema({
  client: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },

  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },

  house: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'House',
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  creationDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ['request', 'operation', 'cancelled'],
    default: 'request',
  },

  price: {
    type: Number,
    min: 0,
    default: 0,
  },

  paid: {
    type: Number,
    min: 0,
    default: 0,
  },

  accepted: {
    type: Boolean,
    default: false,
  },
});

rentSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    ret.active = doc.startDate <= new Date() && doc.endDate >= new Date();
    ret.duration = parseInt(
      (ret.endDate - ret.startDate) / (1000 * 60 * 60 * 24),
      10
    );
    ret.test = doc.startDate.date;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

function validateRent(values) {
  const schema = Joi.object({
    // client: Joi.objectId().required(),
    // house: Joi.objectId().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  });

  return schema.validate(values);
}

module.exports.rentSchema = rentSchema;
module.exports.Rent = mongoose.model('Rent', rentSchema);
module.exports.validateRent = validateRent;
