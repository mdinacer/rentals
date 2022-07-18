const mongoose = require('mongoose');
const Joi = require('joi');

const rentSchema = new mongoose.Schema({
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Profile',
    required: true,
  },

  receiver: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Profile',
    required: true,
  },

  property: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Property',
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
    enum: ['request', 'operation', 'rejected', 'cancelled'],
    default: 'request',
  },

  price: {
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
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

function validateRent(values) {
  const schema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  });

  return schema.validate(values);
}

module.exports.rentSchema = rentSchema;
module.exports.Rent = mongoose.model('Rent', rentSchema);
module.exports.validateRent = validateRent;
