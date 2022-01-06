const express = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/AuthController');


const authRouter = express.Router();


authRouter.post(
  '/login', 
  login,
);


module.exports = authRouter;