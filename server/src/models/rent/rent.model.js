const { Task, init } = require('fawn');

const { House } = require('../../models/house/house.mongo');
const { User } = require('../../models/user/user.mongo');
const { Rent, validateRent } = require('./rent.mongo');

init(process.env.MONGO_URL);

async function ListRents(skip, limit, params) {
  const { orderBy, ...filters } = params;
  const query = Rent.find(filters);

  if (orderBy) {
    switch (orderBy) {
      case 'name':
        query = query.sort({ name: 1 });
        break;
      case 'availability':
        query = query.sort({ active: 1 });
        break;

      default:
        break;
    }
  }

  if (skip && limit) {
    query = query.skip(skip).limit(limit);
  }

  const result = await query.select({
    title: 1,
    slug: 1,
    catchPhrase: 1,
    'cover.pictureUrl': 1,
    details: 1,
    address: 1,
  });
  return result;
}

async function CreateRent(user, slug, data) {
  validateRentData(data);

  const house = await House.findOne({ slug: slug });

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

  new Task()
    .save('rents', rent)
    .update('houses', { slug: slug }, { $push: { rents: rent._id } })
    .update(
      'users',
      { _id: user._id },
      { $push: { 'requests.sent': rent._id } }
    )
    .update(
      'users',
      { _id: house.owner },
      { $push: { 'requests.received': rent._id } }
    )
    .run();
  return rent;
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
  CreateRent,
  AcceptRent,
  DeleteRent,
};
