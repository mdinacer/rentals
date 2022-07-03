const { Task, init } = require('fawn');

const { House } = require('../../models/house/house.mongo');
const { User } = require('../../models/user/user.mongo');
const { Rent, validateRent } = require('./rent.mongo');

init(process.env.MONGO_URL, 'tempRentsCollection');

async function ListRents(skip, limit, params) {
  const { orderBy, ...filters } = params;
  const query = await Rent.find(filters)
    .sort({ [orderBy]: -1 })
    .populate([
      {
        path: 'owner',
        select: 'profile',
        populate: {
          path: 'profile',
          model: 'Profile',
          select: [
            '_id',
            'fullName',
            'firstName',
            'lastName',
            'address',
            'email',
            'mobile',
            'image.pictureUrl',
          ],
        },
      },
      {
        path: 'client',
        select: 'profile',
        populate: {
          path: 'profile',
          model: 'Profile',
          select: [
            '_id',
            'fullName',
            'firstName',
            'lastName',
            'address',
            'email',
            'mobile',
            'image.pictureUrl',
          ],
        },
      },
      {
        path: 'house',
        select: ['title', 'type', 'address', 'cover.pictureUrl'],
        populate: {
          path: 'rents',
          model: 'Rent',
          select: ['active'],
        },
      },
    ])
    .skip(skip)
    .limit(limit);

  const totalCount = await Rent.countDocuments(filters);
  return { items: query, totalCount };
}

async function GetRent(user, rentId) {
  console.log(user);
  const rent = await Rent.findOne({
    _id: rentId,
    $or: [{ owner: user._id }, { client: user._id }],
  }).populate([
    {
      path: 'owner',
      select: 'profile',
      populate: {
        path: 'profile',
        model: 'Profile',
        select: [
          '_id',
          'fullName',
          'firstName',
          'lastName',
          'address',
          'email',
          'mobile',
          'image.pictureUrl',
        ],
      },
    },
    {
      path: 'client',
      select: 'profile',
      populate: {
        path: 'profile',
        model: 'Profile',
        select: [
          '_id',
          'fullName',
          'firstName',
          'lastName',
          'address',
          'email',
          'mobile',
          'image.pictureUrl',
        ],
      },
    },
    {
      path: 'house',
      select: ['title', 'type', 'address', 'cover.pictureUrl'],
      populate: {
        path: 'rents',
        model: 'Rent',
        select: ['active'],
      },
    },
    {
      path: 'payments',
      sort: { paymentDate: 1 },
      select: ['creationDate', 'paymentDate', 'amount', 'type', 'received'],
    },
  ]);

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }
  return rent;
}

async function GetActiveRequest(user, houseId) {
  const rent = await Rent.findOne({
    house: houseId,
    client: user._id,
    status: 'request',
  });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }
  return rent;
}

async function CreateRent(user, houseId, data) {
  console.log(data);
  validateRentData(data);

  const house = await House.findById(houseId);

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  const rent = new Rent({
    owner: house.owner,
    client: user._id,
    house: house._id,
    startDate: data.startDate,
    endDate: data.endDate,
  });

  await rent.save();

  // new Task()
  //   .save('rents', rent)
  //   .update('houses', { id: houseId }, { $push: { rents: rent._id } })
  //   .update(
  //     'users',
  //     { _id: user._id },
  //     { $push: { 'requests.sent': rent._id } }
  //   )
  //   .update(
  //     'users',
  //     { _id: house.owner },
  //     { $push: { 'requests.received': rent._id } }
  //   )
  //   .run();
  return rent;
}

async function EditRent(user, id, data) {
  validateRentData(data);
  const rent = await Rent.findOne({ _id: id, owner: user._id });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  if (!rent.status === 'request') {
    const error = Error('You cannot update a confirmed rent operation');
    error.statusCode = 400;
    throw error;
  }

  await rent.updateOne(data);
  return await Rent.findOne({ _id: id });
}

async function AcceptRent(user, id) {
  const rent = await Rent.findOne({ _id: id, owner: user._id });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  const result = await rent.updateOne({ accepted: true, type: 'operation' });
  return result.modifiedCount > 0;
}

async function CancelRent(user, id) {
  const rent = await Rent.findOne({
    _id: id,
    $or: [{ owner: user._id }, { client: user._id }],
  });

  if (!rent) {
    const error = Error('No matching operation found');
    error.statusCode = 404;
    throw error;
  }

  const result = await rent.updateOne({ accepted: false, type: 'cancelled' });
  return result.modifiedCount > 0;
}

async function DeleteRent(user, id) {
  const rent = await Rent.findOne({
    _id: id,
    $or: [{ owner: user._id }, { client: user._id }],
    //type: { $ne: 'cancelled' },
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
    rent.client.toString() === user._id.toString() &&
    rent.type === 'request'
  ) {
    new Task()
      .delete('rents', rent)
      .update('houses', { id: rent.house }, { $pull: { rents: rent._id } })
      .update(
        'users',
        { _id: rent.client },
        { $pull: { 'requests.sent': rent._id } }
      )
      .update(
        'users',
        { _id: rent.owner },
        { $pull: { 'requests.received': rent._id } }
      )
      .run();
  }

  if (rent.owner.toString() === user._id.toString()) {
    new Task()
      .update('rents', { _id: rent._id }, { type: 'cancelled' })
      .update('houses', { _id: rent.house }, { $pull: { rents: rent._id } })
      .update(
        'users',
        { _id: rent.owner },
        { $pull: { 'requests.received': rent._id } }
      )
      .run();
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
