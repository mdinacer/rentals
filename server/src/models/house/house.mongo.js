const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Joi = require('joi');

const { Schema: imageSchema } = require('../shared/image.mongo');
const { addressSchema } = require('../address/address.mongo');
const {
  houseDetailsSchema,
  housePriceSchema,
} = require('./houseDetails.mongo');

mongoose.plugin(slug);

const houseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },

  slug: {
    type: String,
    slug: 'title',
    unique: true,
  },

  type: {
    type: String,
    enum: ['apartment', 'house'],
    default: 'apartment',
  },

  catchPhrase: {
    type: String,
    required: true,
  },

  details: houseDetailsSchema,

  prices: [housePriceSchema],

  address: {
    type: addressSchema,
    required: true,
  },

  cover: {
    type: imageSchema,
  },

  images: [imageSchema],

  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },

  rents: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Rent',
    },
  ],
  reviews: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Review',
    },
  ],
  creationDate: {
    type: Date,
    default: Date.now(),
  },

  rating: {
    type: Number,
    default: 0,
  },
});

houseSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;

    // ret.owner = {
    //   id: doc.owner._id,
    //   fullName: `${doc.owner.profile.firstName} ${doc.owner.profile.lastName}`,
    //   image: doc.owner.profile.image.pictureUrl,
    // };
    // delete ret.rents;
    // ret.rents = {
    //   requests: doc.rents?.filter((rent) => rent.status === 'request') || [],
    //   operations:
    //     doc.rents?.filter((rent) => rent.status === 'operation') || [],
    //   cancelled: doc.rents?.filter((rent) => rent.status === 'cancelled') || [],
    // };
    // ret.available = !doc.rents.some((rent) => rent.active);
    // ret.availableFrom = doc.rents.filter((rent) => rent.active)[0]?.endDate;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

function validateHouse(values) {
  const addressValidationSchema = Joi.object({
    country: Joi.string().min(5).max(255).required(),
    province: Joi.string().min(5).max(255).required(),
    city: Joi.string().min(5).max(255).required(),
    address1: Joi.string().min(5).max(255).required(),
    address2: Joi.string().min(5).max(255),
  });
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    catchPhrase: Joi.string(),
    address: addressValidationSchema,
    owner: Joi.objectId().required(),
  });

  return schema.validate(values);
}

module.exports.House = mongoose.model('House', houseSchema);
module.exports.validate = validateHouse;
