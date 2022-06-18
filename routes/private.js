const express = require('express')
const router = express.Router()
const { getPrivateData, uploadImage, updateProfile, getUserData } = require('../controllers/private')
const store = require('../middlewares/multer')


//[GET]
router.route('/').get(getPrivateData)
router.route('/userData').get(getUserData)

//[PUT]
router.route('/update').put(updateProfile)

//[POST]
router.route('/upload').post(store.single('image'), uploadImage)

module.exports = router