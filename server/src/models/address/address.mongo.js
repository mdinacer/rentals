const { string } = require('joi');
const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  provinces: [
    {
      province: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Province',
        required: true,
      },
    },
  ],
});

const provinceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Country',
    required: true,
  },
  cities: [
    {
      city: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'City',
      },
    },
  ],
});

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  province: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Province',
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    default: 'Algeria',
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  location: {
    long: String,
    lat: String,
  },
});

addressSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

module.exports.addressSchema = addressSchema;
