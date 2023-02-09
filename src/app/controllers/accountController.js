require('dotenv').config()
const path = require('path')
const { client } = require('./../utils/db')
const { regex } = require('./../utils/regex')
const { SQL } = require('./../utils/query')
const { errors } = require('./../utils/error')
const bcrypt = require('bcrypt')
const ImageKit = require('imagekit')

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

const sendAccountPage = (req, res) => {
    res.render("pages/account.pug")
}

module.exports = {
    sendAccountPage,
    // uploadProfilePic,
    // handleAccountLogOut,
    // handleAccountUpdates,
    // handleAccountDeletion,
}
