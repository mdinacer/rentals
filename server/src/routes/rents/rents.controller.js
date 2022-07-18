const {
  ListRents,
  GetRent,
  GetActiveRequest,
  CreateRent,
  EditRent,
  DeleteRent,
  AcceptRent,
  CancelRent,
} = require('../../models/rent/rent.model');

const { getPagination } = require('../../services/query');

async function httpListRents(req, res) {
  const { pageNumber, pageSize, ...params } = req.query;
  const { skip, limit } = getPagination({ pageNumber, pageSize });
  const rents = await ListRents(req.user, skip, limit, params);
  return res.status(200).json(rents);
}

async function httpGetRent(req, res) {
  const rentId = req.params.id;
  const rent = await GetRent(req.user, rentId);
  return res.status(200).json(rent);
}

async function httpGetActiveRequest(req, res) {
  const houseId = req.params.id;
  const rent = await GetActiveRequest(req.user, houseId);
  return res.status(200).json(rent);
}

async function httpCreateRent(req, res) {
  const houseId = req.params.id;
  const rent = await CreateRent(req.user, houseId, req.body);
  return res.status(201).json(rent);
}

async function httpEditRent(req, res) {
  const rentId = req.params.id;
  const rent = await EditRent(req.user, rentId, req.body);
  return res.status(200).json(rent);
}

async function httpAcceptRent(req, res) {
  const rentId = req.params.id;
  const rent = await AcceptRent(req.user, rentId);
  return res.status(200).json(rent);
}

async function httpCancelRent(req, res) {
  const rentId = req.params.id;
  const rent = await CancelRent(req.user, rentId);
  return res.status(200).json(rent);
}

async function httpDeleteRent(req, res) {
  const rentId = req.params.id;
  const rent = await DeleteRent(req.user, rentId);
  return res.status(200).json(rent);
}

module.exports = {
  httpListRents,
  httpGetRent,
  httpGetActiveRequest,
  httpCreateRent,
  httpEditRent,
  httpDeleteRent,
  httpAcceptRent,
  httpCancelRent,
};
