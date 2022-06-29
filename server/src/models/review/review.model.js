const { Review, validateReview } = require('./review.mongo');
const { House } = require('../house/house.mongo');

const socketApi = require('../../services/socket');
// const { init, Task } = require('fawn');

// init(process.env.MONGO_URL, 'tempReviewCollection');

async function GetReviewsByHouse(houseId, skip, limit) {
  const reviews = await Review.find({ house: houseId })
    .populate('host')
    .sort({ creationDate: -1 })
    .skip(skip)
    .limit(limit);

  const totalCount = await Review.countDocuments({ house: houseId });
  return { items: reviews, totalCount };
}

async function GetReviewsByUser(user, skip, limit) {
  const reviews = await Review.find({ host: user._id })
    .populate('host')
    .sort({ creationDate: -1 })
    .skip(skip)
    .limit(limit);

  const totalCount = await Review.countDocuments({ host: user._id });
  return { items: reviews, totalCount };
}

async function CreateReview(user, houseId, data) {
  validate(data);
  const house = await House.findById(houseId);

  if (!house) {
    const error = Error('No matching house found');
    error.statusCode = 404;
    throw error;
  }
  const review = new Review({
    ...data,
    host: user._id,
    hostName: `${user.profile.firstName} ${user.profile.lastName}`,
    house: house._id,
  });

  await review.save();
  await House.findOneAndUpdate(
    { _id: house.id },
    {
      $set: {
        rating:
          house.rating > 0
            ? Math.ceil((house.rating + review.rating) / 2)
            : review.rating,
      },
      $push: {
        reviews: review._id,
      },
    }
  );

  socketApi.io.in(house.slug).emit('addReview', review);

  // socketApi.io.emit('houseRequired', houseData);
  // socket.broadcast
  // .to(user.room)
  // .emit('message', { user: 'admin', text: `${user.name}, has joined` });

  return review;
}

async function EditReview(user, reviewId, data) {
  validate(data);

  let review = await Review.findOne({ _id: reviewId, host: user._id });

  if (!review) {
    const error = Error('No matching review found');
    error.statusCode = 404;
    throw error;
  }
  await review.updateOne(data);
  return review;
}

async function DeleteReview(user, id) {
  validate(data);

  let review = await Review.findOne({ _id: id, host: user.profile });

  if (!review) {
    const error = Error('No matching review found');
    error.statusCode = 404;
    throw error;
  }
  return await review.updateOne({ deleted: true });
}

function validate(values) {
  const { error: validationError } = validateReview(values);

  if (validationError) {
    const error = Error(validationError.details[0].message);
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  GetReviewsByHouse,
  GetReviewsByUser,
  CreateReview,
  EditReview,
  DeleteReview,
};
