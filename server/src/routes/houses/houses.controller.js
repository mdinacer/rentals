const {
  ListHouses,
  GetHouse,
  CreateHouse,
  EditHouse,
  DeleteHouse,
  UpdateDetails,
  UpdatePrices,
} = require('../../models/house/house.model');

const { getPagination } = require('../../services/query');

async function httpListHouses(req, res) {
  const { pageNumber, pageSize, ...params } = req.query;
  const { skip, limit } = getPagination({ pageNumber, pageSize });
  const houses = await ListHouses(skip, limit, params);
  return res.status(200).json(houses);
}

async function httpGetHouse(req, res) {
  const house = await GetHouse(req.params.slug);
  return res.status(200).json(house);
}

async function httpCreateHouse(req, res) {
  const { cover, images } = req.files;
  const house = await CreateHouse(req.user._id, req.body, cover, images);
  return res.status(201).json(house);
}

async function httpEditHouse(req, res) {
  const { cover, images } = req.files;
  const slug = req.params.slug;
  const house = await EditHouse(req.user, slug, req.body, cover, images);
  return res.status(200).json(house);
}

async function httpDeleteHouse(req, res) {
  const slug = req.params.slug;
  await DeleteHouse(slug, req.user);
  return res.status(200).json({ success: true });
}

async function httpUpdateDetails(req, res) {
  const slug = req.params.slug;
  const house = await UpdateDetails(req.user, slug, req.body);
  return res.status(200).json(house);
}

async function httpUpdatePrices(req, res) {
  const slug = req.params.slug;
  const house = await UpdatePrices(req.user, slug, req.body);
  return res.status(200).json(house);
}

module.exports = {
  httpListHouses,
  httpGetHouse,
  httpCreateHouse,
  httpEditHouse,
  httpDeleteHouse,
  httpUpdateDetails,
  httpUpdatePrices,
};
