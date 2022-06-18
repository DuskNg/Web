const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title of product']
    },
    subtitle: {
        type: String,
        required: [true, 'Please provide subtitle of product']
    },
    description: {
        type: String,
        required: [true, 'Please provide description of product'],
        maxlength: 3000,
    },
    category: {
        type: String,
        required: [true, 'Please provide category of product'],
        enum: ['pant', 'shirt', 'shoes']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price of product']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide amount of product']
    },
    images: {
        type: Array,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

}, {
    timestamps: true, // auto createdAt, updatedAt 
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product