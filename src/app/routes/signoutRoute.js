const express = require('express')
const router = express.Router()

const { signOutCurrentUser } = require('./../controllers/signoutController')

router.post("/", signOutCurrentUser)