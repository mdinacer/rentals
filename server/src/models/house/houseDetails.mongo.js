const mongoose = require('mongoose');
const Joi = require('joi');

const housePriceSchema = new mongoose.Schema({
  price: {
    type: Number,
    default: 0,
    min: 0,
  },

  installment: {
    type: Boolean,
    default: false,
  },

  duration: {
    type: String,
    enum: ['day', 'week', 'month', 'year'],
    default: 'day',
    required: true,
  },
});

housePriceSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

const houseDetailsSchema = new mongoose.Schema({
  floors: {
    type: Number,
  },

  rooms: {
    type: Number,
    min: 1,
    default: 1,
  },

  beds: {
    type: Number,
    min: 1,
    default: 1,
  },

  kitchens: {
    type: Number,
    min: 1,
    default: 1,
  },

  baths: {
    type: Number,
    min: 1,
    default: 1,
  },

  parkings: {
    type: Number,
    min: 0,
    default: 0,
  },

  pools: {
    type: Number,
    min: 0,
    default: 0,
  },

  gardens: {
    type: Number,
    min: 0,
    default: 0,
  },
});

houseDetailsSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

const houseServicesSchema = new mongoose.Schema({
  accessibility: {
    type: Boolean,
    default: false,
  },

  airConditioner: {
    type: Boolean,
    default: false,
  },

  elevator: {
    type: Boolean,
    default: false,
  },

  furniture: {
    type: Boolean,
    default: false,
  },

  cityGas: {
    type: Boolean,
    default: false,
  },

  heater: {
    type: Boolean,
    default: false,
  },

  hotWater: {
    type: Boolean,
    default: false,
  },

  internet: {
    type: Boolean,
    default: false,
  },

  petsAllowed: {
    type: Boolean,
    default: false,
  },

  smokingFree: {
    type: Boolean,
    default: false,
  },
});

function validateDetails(values) {
  const schema = Joi.object({
    floors: Joi.number().min(0).max(300),
    rooms: Joi.number().min(0).max(50),
    beds: Joi.number().min(0).max(50),
    baths: Joi.number().min(0).max(50),
    kitchens: Joi.number().min(0).max(50),
    parkings: Joi.number().min(0).max(50),
    pools: Joi.number().min(0).max(50),
  });

  return schema.validate(values);
}

function validatePrice(values) {
  const schema = Joi.object({
    price: Joi.number().min(0).required(),
    duration: Joi.string().required(),
  });

  return schema.validate(values);
}

module.exports.houseDetailsSchema = houseDetailsSchema;
module.exports.validateDetails = validateDetails;
module.exports.HouseDetails = mongoose.model(
  'HouseDetails',
  houseDetailsSchema
);
module.exports.housePriceSchema = housePriceSchema;
module.exports.validatePrice = validatePrice;
module.exports.HousePrice = mongoose.model('HousePrice', housePriceSchema);

module.exports.houseServicesSchema = houseServicesSchema;
