require('dotenv').config()
const express = require('express')
const homeController = require('./../controllers/homeController');
const router = express.Router()
const regex = new RegExp()
router.get('/', homeController.getHomePage);
router.post('/:id', homeController.postDataFromHome);
module.exports = router
