const express = require('express');
const authenticated = require('../../middlewares/auth');
const {
    httpRegisterUser,
    httpUpdateUser,
    httpDeleteUser,
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/', httpRegisterUser);
usersRouter.put('/:id', authenticated, httpUpdateUser);
usersRouter.delete('/:id', authenticated, httpDeleteUser);

module.exports = usersRouter;
