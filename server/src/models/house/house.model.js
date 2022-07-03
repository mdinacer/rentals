const { House, validate } = require('./house.mongo');
const { validateDetails, validatePrice } = require('./houseDetails.mongo');
const { User } = require('../user/user.mongo');
const { Profile } = require('../profile/profile.mongo');

const socketApi = require('../../services/socket');

const pick = require('lodash/pick');

const { SaveImage, DeleteImage } = require('../../services/cloudinary');

async function ListHouses(skip, limit, params) {
  const { orderBy, pagination, ...filters } = params;
  const query = await House.find(filters)
    .populate('rents')
    .sort({
      name: 1,
    })
    .skip(skip)
    .limit(limit)
    .select('  -owner -images');

  const totalCount = await House.countDocuments();
  return { items: query, totalCount };
}

async function GetHousesByUser(user) {
  const houses = await House.find({ owner: user._id })
    .populate([
      {
        path: 'owner',
        populate: {
          path: 'profile',
          model: 'Profile',
        },
      },
      { path: 'rents' },
    ])
    .sort({
      name: 1,
    });

  return houses;
}

async function GetHouse(slug, user) {
  const house = await House.findOne({ slug: slug }).populate([
    {
      path: 'owner',
      populate: {
        path: 'profile',
        model: 'Profile',
      },
    },
    {
      path: 'rents',
    },
    {
      path: 'reviews',
      select: { creationDate: 1, host: 1, hostName: 1, rating: 1, body: 1 },
    },
  ]);

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  const houseData = pick(house, [
    'id',
    'slug',
    'title',
    'type',
    'catchPhrase',
    'cover',
    'images',
    'prices',
    'details',
    'address',
    'rating',
    'reviews',
  ]);

  const activeRent = house.rents.some((rent) => rent.active);

  return {
    ...houseData,
    available: !!activeRent,
    availableFrom: activeRent ? activeRent.endDate : null,
    owner: {
      id: house.owner._id,
      fullName: `${house.owner.profile.firstName} ${house.owner.profile.lastName}`,
      image: house.owner.profile.image.pictureUrl,
      email: house.owner.profile.email,
      mobile: house.owner.profile.mobile,
    },
    // rents: {
    requests: house.rents?.filter((rent) => rent.status === 'request') || [],
    operations:
      house.rents?.filter((rent) => rent.status === 'operation') || [],
    cancelled: house.rents?.filter((rent) => rent.status === 'cancelled') || [],
    // },
  };
}

async function CreateHouse(userId, data, cover, images) {
  validateHouse();

  const user = await User.findById(userId);

  const house = new House(data);
  house.set({ owner: user._id });

  if (cover && cover.length > 0) {
    const result = await SaveImage(cover[0].buffer, 'houses');
    house.set({ cover: result });
  }

  if (images && images.length > 0) {
    try {
      const results = [];
      for (const image of images) {
        const result = await SaveImage(image.buffer, 'houses');
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

async function EditHouse(user, houseId, data, cover, images) {
  validateHouse();

  const house = await House.findOne({ _id: houseId, owner: user._id });

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  if (cover && cover.length > 0) {
    const result = await SaveImage(cover[0].buffer, 'houses');
    data.cover = result;
  }

  if (images && images.length > 0) {
    try {
      const results = [];
      for (const image of images) {
        const result = await SaveImage(
          image.buffer,
          'houses',
          500,
          500,
          'auto'
        );
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

  return House.findById(houseId);
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

async function DeleteHouse(id, user) {
  const house = await House.findOne({
    _id: id,
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

async function AddToFavorites(houseId, user) {
  const house = await House.findById(houseId);

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }

  const favorite = user.profile.favorites.includes(houseId);

  if (favorite) {
    await Profile.updateOne(
      { user: user._id },
      { $pull: { favorites: houseId } }
    );
    return false;
  } else {
    await Profile.updateOne(
      { user: user._id },
      { $push: { favorites: houseId } }
    );
    return true;
  }
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
  GetHousesByUser,
  GetHouse,
  CreateHouse,
  EditHouse,
  UpdateDetails,
  UpdatePrices,
  DeleteHouse,
  AddToFavorites,
};
