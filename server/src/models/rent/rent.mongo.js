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

  payments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Payment',
    },
  ],
});

rentSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    ret.active = doc.startDate <= new Date() && doc.endDate >= new Date();
    ret.duration = parseInt(
      (ret.endDate - ret.startDate) / (1000 * 60 * 60 * 24),
      10
    );

    // ret.owner = {
    //   id: doc.owner._id,
    //   firstName: doc.owner.profile.firstName,
    //   lastName: doc.owner.profile.lastName,
    //   fullName: `${doc.owner.profile.firstName} ${doc.owner.profile.lastName}`,
    //   image: doc.owner.profile.image?.pictureUrl || '',
    //   address: `${doc.owner.profile.address?.country}, ${doc.owner.profile.address?.province}, ${doc.owner.profile.address?.city}`,

    // };
    // delete ret.owner;
    // delete ret.client;
    // delete ret.house;
    // ret.owner = {
    //   id: doc.owner._id,
    //   fullName: `${doc.owner.profile.firstName} ${doc.owner.profile.lastName}`,
    //   address: `${doc.client.profile.address.country}, ${doc.client.profile.address.province}, ${doc.client.profile.address.city}`,
    // };

    // ret.client = {
    //   id: doc.client._id,
    //   fullName: `${doc.client.profile.firstName} ${doc.client.profile.lastName}`,
    //   address: `${doc.client.profile.address.country}, ${doc.client.profile.address.province}, ${doc.client.profile.address.city}`,
    // };

    // ret.house = {
    //   id: doc.house._id,
    //   title: doc.house.title,
    //   address: `${doc.house.address.country}, ${doc.house.address.province}, ${doc.house.address.city}`,
    //   type: doc.house.type,
    // };
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
