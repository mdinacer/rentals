const {
  ListRents,
  CreateRent,
  AcceptRent,
  DeleteRent,
} = require('../../models/rent/rent.model');

const { getPagination } = require('../../services/query');

async function httpListRents(req, res) {
  const { pageNumber, pageSize, ...params } = req.query;
  const { skip, limit } = getPagination({ pageNumber, pageSize });
  const rents = await ListRents(skip, limit, params);
  return res.status(200).json(rents);
}

// async function httpGetRent(req, res) {
//   const rent = await GetRent(req.params.slug);
//   return res.status(200).json(rent);
// }

async function httpCreateRent(req, res) {
  const slug = req.params.slug;
  const rent = await CreateRent(req.user, slug, req.body);
  return res.status(201).json(rent);
}

async function httpAcceptRent(req, res) {
  const id = req.params.id;
  const rent = await AcceptRent(req.user, id);
  return res.status(200).json(rent);
}

async function httpDeleteRent(req, res) {
  const id = req.params.id;
  const rent = await DeleteRent(req.user, id);
  return res.status(200).json(rent);
}

// async function httpEditRent(req, res) {
//   const { cover, images } = req.files;
//   const slug = req.params.slug;
//   const rent = await EditRent(req.user, slug, req.body, cover, images);
//   return res.status(200).json(rent);
// }

// async function httpDeleteRent(req, res) {
//   const slug = req.params.slug;
//   await DeleteRent(slug, req.user);
//   return res.status(200).json({ success: true });
// }

// async function httpUpdateDetails(req, res) {
//   const slug = req.params.slug;
//   const rent = await UpdateDetails(req.user, slug, req.body);
//   return res.status(200).json(rent);
// }

// async function httpUpdatePrices(req, res) {
//   const slug = req.params.slug;
//   const rent = await UpdatePrices(req.user, slug, req.body);
//   return res.status(200).json(rent);
// }

module.exports = {
  httpListRents,
  //httpGetRent,
  httpCreateRent,
  httpAcceptRent,
  httpDeleteRent,
  // httpEditRent,
  // httpDeleteRent,
  // httpUpdateDetails,
  // httpUpdatePrices,
};
