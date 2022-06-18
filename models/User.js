const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    avatar: {
        name: String,
        contentType: String
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false
    },
    phone: {
        type: String,
        unique: true,
        sparse: true
    },
    address: {
        type: String,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true, // auto createdAt, updatedAt 
})

//hash password with brcypt
UserSchema.pre('save', async function (next) {
    // if này để tránh việc về sau mà có logic cần save() lại
    // thì password sẽ kp hash thêm nữa
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// compare password to login
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//encode: Sign Token
UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { // dùng crypto để tạo ra JWT_SECRET(hướng dẫn bên dưới)
        expiresIn: process.env.JWT_EXPIRE
    })
}

//ResetPasswordToken
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    //hash resetToken by crypto
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 20 * (60 * 1000) // đơn vị tính là ms, 60s * 1000ms = 1m

    return resetToken
}

const User = mongoose.model('user', UserSchema)

module.exports = User



// required:[true, 'message..'] : bắt buộc phải có, khi k có sẽ hiện message

// match: phải là trường match, để check valid email

// select: false nghĩa là field nào mà có property này thì khi truy vấn đến model(query: hiểu đơn giản là khi tìm đến model đó)
// thì sẽ k truy xuất được dữ liệu field đó(k lấy được value, trong model này là password), trừ khi phải select lấy field đó ra mới truy
// xuất dữ liệu được(như trong routes login).
// const user = await User.findOne({email}).select('+password'): tìm user theo email, select('+password') để cho phép lấy dữ liệu
// của trường password, nếu k có select('+password') thì khi log ra sẽ k có field password
// Ngược lại, .select('-password') là loại bỏ field password khi truy vấn đến model

// tạo chuỗi JWT_SECRET:
// mở terminal, điền node, sau đó điền: require('crypto').randomBytes(35).toString("hex")
