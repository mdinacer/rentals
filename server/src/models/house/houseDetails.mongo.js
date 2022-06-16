const mongoose = require('mongoose');
const Joi = require('joi');

const housePriceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },

  price: {
    type: Number,
    default: 0,
    min: 0,
  },

  duration: {
    type: Number,
    required: true,
    min: 0,
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
  floor: {
    type: Number,
  },

  area: {
    type: String,
  },

  rooms: {
    type: Number,
    min: 1,
    default: 1,
  },

  baths: {
    type: Number,
    min: 1,
    default: 1,
  },

  parking: {
    type: Boolean,
    default: false,
  },

  pool: {
    type: Boolean,
    default: false,
  },

  smokingAllowed: {
    type: Boolean,
    default: false,
  },

  petsAllowed: {
    type: Boolean,
    default: false,
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

function validateDetails(values) {
  const schema = Joi.object({
    floor: Joi.number().min(0).max(300),
    area: Joi.number().min(0),
    rooms: Joi.number().min(0).max(50),
    baths: Joi.number().min(0).max(50),
    parking: Joi.boolean(),
    pool: Joi.boolean(),
    smokingAllowed: Joi.boolean(),
    petsAllowed: Joi.boolean(),
  });

  return schema.validate(values);
}

function validatePrice(values) {
  const schema = Joi.object({
    title: Joi.string().min(0).max(300).required(),
    price: Joi.number().min(0).required(),
    duration: Joi.number().min(0).required(),
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