const express = require('express')
const router = express.Router()
const { postPublicData, getPublicData, putPublicData, deletePublicData, postComments, getComments, updateAmount } = require('../controllers/public')
const store = require('../middlewares/multer')


//[GET]
router.route('/').get(getPublicData)

//[Post]
router.route('/').post(store.array('images', 3), postPublicData)
router.route('/comments').post(postComments)
router.route('/updateAmount').post(updateAmount)
router.route('/comments').get(getComments)

//[PUT]
router.route('/').put(store.array('images', 3), putPublicData)

//[DELETE]
router.route('/').delete(deletePublicData)



module.exports = router