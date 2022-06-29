const {
  ListHouses,
  GetHousesByUser,
  GetHouse,
  CreateHouse,
  EditHouse,
  DeleteHouse,
  UpdateDetails,
  UpdatePrices,
  AddToFavorites,
} = require('../../models/house/house.model');

const { getPagination, setPaginationHeader } = require('../../services/query');

async function httpListHouses(req, res) {
  const { paginated, pageNumber, pageSize, ...params } = req.query;
  const { skip, limit } = getPagination({ pageNumber, pageSize });
  const { totalCount, items } = await ListHouses(skip, limit, params);

  setPaginationHeader(req, totalCount, res);

  return res.status(200).json(items);
}

async function httpGetHousesByUser(req, res) {
  result = await GetHousesByUser(req.user);
  return res.status(200).json(result);
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
  let cover = req.files.cover || null;
  let images = req.files.images || null;
  const houseId = req.params.id;
  const house = await EditHouse(req.user, houseId, req.body, cover, images);
  return res.status(200).json(house);
}

async function httpDeleteHouse(req, res) {
  const houseId = req.params.id;
  await DeleteHouse(houseId, req.user);
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

async function httpAddToFavorites(req, res) {
  const houseId = req.params.id;
  const isFav = await AddToFavorites(houseId, req.user);
  return res.status(200).json({ isFav });
}

module.exports = {
  httpListHouses,
  httpGetHousesByUser,
  httpGetHouse,
  httpCreateHouse,
  httpEditHouse,
  httpDeleteHouse,
  httpUpdateDetails,
  httpUpdatePrices,
  httpAddToFavorites,
};
