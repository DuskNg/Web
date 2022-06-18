const multer = require('multer')
const path = require('path')
//storage

const storage = multer.diskStorage({

    //specify where i want to upload images
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

module.exports = store = multer({ storage: storage, limits: { fieldSize: 1024 *1024 *3 }})
