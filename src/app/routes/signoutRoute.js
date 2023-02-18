const express = require('express')
const router = express.Router()

const { signOutCurrentUser, deleteAccount } = require('./../controllers/signoutController')

router.post('/', signOutCurrentUser)

router.post("/delete", deleteAccount)