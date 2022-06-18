const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const fs = require('fs')
const path = require('path')

//[GET] private data
exports.getPrivateData = (req, res, next) => {
    const { _id, username, email, gender, phone, address, avatar } = req.user
    res.status(200).json({
        success: true,
        data: { _id, username, email, gender, phone, address, avatar }
    })
}

//[GET] get user data
exports.getUserData = async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: req.user
    })
}

//[PUT] private data
exports.updateProfile = async (req, res, next) => {
    const { username, phone, address } = req.body
    try {
        const { _id } = req.user
        const user = await User.findOneAndUpdate({ _id }, req.body)
        user.save()
        res.status(200).json({
            success: true,
            data: { username, phone, address }
        })
    } catch (error) {
        next(error)
    }

}

//[POST]
exports.uploadImage = async (req, res, next) => {
    const { _id } = req.user
    const avatarPath = fs.readFileSync(req.file.path)
    const encode_avatar = avatarPath.toString('base64')
    const avatar = {
        name: encode_avatar,
        contentType: req.file.mimetype
    }
    const user = await User.findOneAndUpdate({ _id }, { avatar })
    user.save()
}
