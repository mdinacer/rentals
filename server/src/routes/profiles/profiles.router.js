const express = require('express');

const auth = require('../../middlewares/auth');
const { UploadMemory: upload } = require('../../services/multer');

const {
  httpGetProfile,
  httpPostProfile,
  httpPutProfile,
} = require('./profiles.controller');

const profilesRouter = express.Router();

profilesRouter.get('/:id', httpGetProfile);
profilesRouter.post('/', [auth, upload.single('file')], httpPostProfile);
profilesRouter.put('/', [auth, upload.single('file')], httpPutProfile);

module.exports = profilesRouter;
