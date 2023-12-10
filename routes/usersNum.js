const express = require("express");
const controller = require('../controllers/usersNum');
const userNumerator = express.Router();

userNumerator.get('/getUserNum', controller.userNum);


module.exports = userNumerator;