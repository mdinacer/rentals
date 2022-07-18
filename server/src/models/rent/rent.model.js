const { Property } = require('../../models/property/property.mongo');
const { Rent, validateRent } = require('./rent.mongo');

const selectItems = [
  '_id',
  'fullName',
  'firstName',
  'lastName',
  'address',
  'email',
  'mobile',
  'image.pictureUrl',
];

async function ListRents(user, skip, limit, params) {
  const { orderBy, ...filters } = params;

  const query = await Rent.find(filters || { receiver: user.profile._id })

    .sort({ [orderBy]: -1 })
    .populate([
      {
        path: 'receiver',
        select: selectItems,
      },
      {
        path: 'sender',
        select: selectItems,
      },
      {
        path: 'property',
        select: ['title', 'type', 'address', 'cover.pictureUrl'],
      },
    ])
    .skip(skip)
    .limit(limit);

  const totalCount = await Rent.countDocuments(filters);
  return { items: query, totalCount };
}

async function GetRent(user, rentId) {
  const rent = await Rent.findOne({
    _id: rentId,
    $or: [{ receiver: user.profile._id }, { sender: user.profile._id }],
  }).populate([
    {
      path: 'receiver',
      select: selectItems,
    },
    {
      path: 'sender',
      select: selectItems,
    },
    {
      path: 'property',
      select: ['title', 'type', 'address', 'cover.pictureUrl'],
    },
  ]);

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  return rent;
}

async function GetActiveRequest(user, propertyId) {
  return await Rent.findOne({
    property: propertyId,
    sender: user.profile._id,
    status: 'request',
  });
}

async function CreateRent(user, propertyId, data) {
  validateRentData(data);

  const property = await Property.findById(propertyId);

  if (!property) {
    const error = Error('No matching property found');
    error.statusCode = 404;
    throw error;
  }

  const rent = new Rent({
    receiver: property.owner,
    sender: user.profile._id,
    property: property._id,
    startDate: data.startDate,
    endDate: data.endDate,
  });

  await rent.save();
  return rent;
}

async function EditRent(user, id, data) {
  validateRentData(data);
  const rent = await Rent.findOne({ _id: id, sender: user.profile._id });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  if (!rent.status === 'request') {
    const error = Error("You can't edit a confirmed rent operation");
    error.statusCode = 400;
    throw error;
  }

  await rent.updateOne(data);
  return await Rent.findOne({ _id: id });
}

async function AcceptRent(user, id) {
  const rent = await Rent.findOne({
    _id: id,
    receiver: user.profile._id,
    status: 'request',
  });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  const result = await rent.updateOne({ accepted: true, status: 'operation' });
  return result.modifiedCount > 0;
}

async function CancelRent(user, id) {
  const rent = await Rent.findOne({
    _id: id,
    $or: [{ receiver: user.profile_id }, { sender: user.profile._id }],
  });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  const status = rent.receiver.equals(user.profile._id)
    ? 'rejected'
    : 'cancelled';

  const result = await rent.updateOne({ accepted: false, status });
  return result.modifiedCount > 0;
}

async function DeleteRent(user, id) {
  const rent = await Rent.findOne({
    _id: id,
    $or: [{ receiver: user.profile._id }, { sender: user.profile._id }],
  });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  if (rent.type === 'cancelled') {
    const error = Error('Operation already cancelled');
    error.statusCode = 400;
    throw error;
  }

  if (
    rent.sender.toString() === user.profile._id.toString() &&
    rent.type === 'request'
  ) {
    await rent.deleteOne();
  }

  if (rent.owner.toString() === user.profile._id.toString()) {
    await rent.update({ type: 'cancelled' });
  }

  return rent;
}

function validateRentData(values) {
  const { error: validationError } = validateRent(values);

  if (validationError) {
    const error = Error(validationError.details[0].message);
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  ListRents,
  GetRent,
  GetActiveRequest,
  CreateRent,
  EditRent,
  DeleteRent,
  AcceptRent,
  CancelRent,
};
