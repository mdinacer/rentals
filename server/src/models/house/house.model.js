const { House, validate } = require('./house.mongo');
const { validateDetails, validatePrice } = require('./houseDetails.mongo');
const { User } = require('../user/user.mongo');

const { SaveImage, DeleteImage } = require('../../services/cloudinary');

async function ListHouses(skip, limit, params) {
  const { orderBy, ...filters } = params;
  const query = House.find(filters);

  if (orderBy) {
    switch (orderBy) {
      case 'name':
        query = query.sort({ name: 1 });
        break;
      case 'availability':
        query = query.sort({ available: 1 });
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

async function GetHouse(slug) {
  const house = await House.findOne({ slug: slug });

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  return house;
}

async function CreateHouse(userId, data, cover, images) {
  validateHouse();

  const user = await User.findById(userId);

  const house = new House(data);
  house.set({ owner: user._id });

  if (cover && cover.length > 0) {
    const result = await SaveImage(cover[0].buffer, 'houses', 200, 200);
    house.set({ cover: result });
  }

  if (images && images.length > 0) {
    try {
      const results = [];
      for (const image of images) {
        const result = await SaveImage(image.buffer, 'houses', 200, 200);
        results.push(result);
      }
      house.set({ images: results });
    } catch (ex) {
      const error = Error(ex);
      error.statusCode = 404;
      throw error;
    }
  }

  await house.save();
  return house;
}

async function EditHouse(user, houseSlug, data, cover, images) {
  validateHouse();

  const house = await House.findOne({ slug: houseSlug, owner: user._id });

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  if (cover && cover.length > 0) {
    const result = await SaveImage(cover[0].buffer, 'houses', 200, 200);
    data.cover = result;
  }

  if (images && images.length > 0) {
    try {
      const results = [];
      for (const image of images) {
        const result = await SaveImage(image.buffer, 'houses', 200, 200);
        results.push(result);
      }
      data.images = results;
    } catch (ex) {
      const error = Error(ex);
      error.statusCode = 404;
      throw error;
    }
  }
  await house.updateOne(data);
  return house;
}

async function UpdateDetails(user, slug, data) {
  const { error: validationError } = validateDetails(data);

  if (validationError) {
    const error = Error(validationError.details[0].message);
    error.statusCode = 400;
    throw error;
  }

  const house = await House.findOne({ slug: slug, owner: user._id });

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  await house.updateOne({ details: data });
  return house.details;
}

async function UpdatePrices(user, slug, values) {
  for (const value of values) {
    const { error: validationError } = validatePrice(value);

    if (validationError) {
      const error = Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }
  }

  const house = await House.findOne({ slug: slug, owner: user._id });

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  await house.updateOne({ prices: values });
  return house.prices;
}

async function DeleteHouse(slug, user) {
  const house = await House.findOne({
    slug: slug,
    owner: user._id,
  });

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  if (house.cover?.publicId) {
    await DeleteImage(house.cover.publicId);
  }

  if (house.images.length > 0) {
    for (const image of house.images) {
      await DeleteImage(image.publicId);
    }
  }
  await house.deleteOne();
  return;
}

function validateHouse(values) {
  const { error: validationError } = validate(values);

  if (validationError) {
    const error = Error(validationError.details[0].message);
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  ListHouses,
  GetHouse,
  CreateHouse,
  EditHouse,
  UpdateDetails,
  UpdatePrices,
  DeleteHouse,
};
