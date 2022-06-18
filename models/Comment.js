const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    comments:
    {
       type: Array
    }

})

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment