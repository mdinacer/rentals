const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema: imageSchema } = require('../shared/image.mongo');
const { addressSchema } = require('../address/address.mongo');

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },

  lastName: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },

  email: {
    type: String,
  },

  image: {
    type: imageSchema,
  },

  phone: {
    type: String,
  },

  mobile: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },

  address: {
    type: addressSchema,
  },
});

profileSchema
  .virtual('fullName')
  .get(() => `${this.firstName} ${this.lastName}`);

profileSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = doc._id;
    ret.image = doc.image.pictureUrl;
    ret.fullName = `${doc.firstName} ${doc.lastName}`;
    // delete ret.firstName;
    // delete ret.lastName;
    delete ret.user;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

function validateProfile(values) {
  console.log('Values: ', values);

  const schema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    phone: Joi.string(),
    mobile: Joi.string().required(),
    'address.country': Joi.string(),
    'address.province': Joi.string(),
    'address.city': Joi.string(),
    'address.address1': Joi.string(),
    // user: Joi.objectId().required(),
  });

  return schema.validate(values);
}

module.exports = {
  Profile: mongoose.model('Profile', profileSchema),
  validateProfile,
};
