const { Review, validateReview } = require('./review.mongo');
const { House } = require('../house/house.mongo');
const { init, Task } = require('fawn');

init(process.env.MONGO_URL, 'tempReviewCollection');

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

  // let review = await Review.findOne({ house: house.id, host: user.profile });

  // if (review) {
  //   const error = Error('You have already posted a review');
  //   error.statusCode = 404;
  //   throw error;
  // }

  const review = new Review({ ...data, host: user.profile, house: house._id });

  new Task()
    .save('reviews', review)
    .update(
      'houses',
      { _id: house.id },
      {
        $set: { rating: (house.rating + review.rating) / 2 },
        $push: {
          review: review._id,
        },
      }
    )
    .run();

  return review;
}

async function EditReview(user, reviewId, data) {
  validate(data);

  let review = await Review.findOne({ _id: reviewId, host: user.profile });

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
