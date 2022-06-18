const fs = require('fs')
const Product = require('../models/Product')
const User = require('../models/User')
const Comment = require('../models/Comment')
const jwt = require('jsonwebtoken')


//[post] public data
exports.postPublicData = async (req, res, next) => {
    const { title, subtitle, description, category, price, amount, token } = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const images = req.files
    const encode_image = images.map(image => {
        const imagePath = fs.readFileSync(image.path)
        return imagePath.toString('base64')
    })
    try {
        const newProduct = new Product({
            title,
            subtitle,
            description,
            category,
            price,
            amount,
            images: encode_image,
            user: decoded.id
        })
        await newProduct.save()

        res.status(200).json({
            success: true,
        })
    } catch (error) {
        next(error)
    }
}

//[GET] public data
exports.getPublicData = async (req, res, next) => {
    const products = await Product.find().sort({ createdAt: -1, updatedAt: -1 }) // .limit(10) 
    const users = await User.find()
    const userPublicField = users.map(user => ({ id: user._id, username: user.username, avatar: user.avatar }))

    res.status(200).json({
        success: true,
        data: [products, userPublicField]
    })
}

//[PUT] public data
exports.putPublicData = async (req, res, next) => {
    const { id, title, subtitle, description, category, price, amount } = req.body
    if (req.files.length === 0) {
        const productFields = {
            title,
            subtitle,
            description,
            category,
            price,
            amount
        }
        const updateProduct = await Product.findByIdAndUpdate(id, productFields)
        updateProduct.save()
    } else {
        const images = req.files
        const encode_image = images.map(image => {
            const imagePath = fs.readFileSync(image.path)
            return imagePath.toString('base64')
        })
        const productFields = {
            title,
            subtitle,
            description,
            category,
            price,
            amount,
            images: encode_image
        }
        const updateProduct = await Product.findByIdAndUpdate(id, productFields)
        updateProduct.save()
    }
    res.status(200).json({
        success: true,
    })

}

//[DELETE] public data
exports.deletePublicData = async (req, res, next) => {
    const { productId } = req.body
    await Product.findByIdAndDelete(productId)
    res.status(200).json({
        success: true,
    })

}

//---------- comments handler

//[Post] comments
exports.postComments = async (req, res, next) => {
    const { productId, comments } = req.body
    // check product to save comment
    const productComment = await Comment.findOne({ productId })
    if (productComment === null) {
        const newComment = await Comment.create({
            productId,
            comments
        })
        newComment.save()
        console.log('created');
    } else {
        const storedComment = productComment.comments
        const updateComment = await Comment.findOneAndUpdate({ productId }, {
            comments: [...storedComment, ...comments]
        })
        updateComment.save()
        console.log('upadted');
    }

    res.status(200).json({
        success: true,
        data: await Comment.findOne({ productId })
    })
}


//[Get] comments
exports.getComments = async (req, res, next) => {
    const { productId } = req.query

    res.status(200).json({
        success: true,
        data: await Comment.findOne({ productId })
    })
}

// [POST] updateAmount

exports.updateAmount = async (req, res, next) => {
    const { remainAmount, productId } = req.body
    const updateAmount = await Product.findByIdAndUpdate(productId, {amount: remainAmount})
    updateAmount.save()
    res.status(200).json({
        success: true,
    })
}