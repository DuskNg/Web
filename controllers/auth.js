const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.register = async (req, res, next) => {
    const { username, email, gender, password } = req.body

    try {
        const user = await User.create({
            username, email, gender, password
        })

        //getSignedToken
        sendToken(user, 201, res)

    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body
    if (!email || !password) return next(new ErrorResponse('Please provide and email and password', 400))

    try {
        const user = await User.findOne({ email }).select('+password') // .select('+password') giải thích trong User model

        if (!user) return next(new ErrorResponse('Invalid User!', 401))

        // compare password  
        const isMatch = await user.matchPassword(password)

        if (!isMatch) return next(new ErrorResponse('Invalid password!', 401))

        //getSignedToken
        sendToken(user, 200, res)

    } catch (error) {
        next(error)
    }
}

exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) return next(new ErrorResponse('Email could not be sent', 404))

        const resetToken = user.getResetPasswordToken()

        await user.save()

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1> you have requested a password reset </h1>
        <p> please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a> `
        //ta sẽ dùng sendgrid để gửi email nên cần clicktracking=off, 
        //vì dùng sendgrid nó sẽ đưa đến 1 link và nó sẽ định tuyến lại(reroute), mà ta lại k muốn như vậy
        try {

        } catch (error) {

        }
    } catch (error) {

    }
}

exports.resetpassword = (req, res, next) => {
    res.send('reset password')
}

// thực hiện db request thì phải dùng async
// const isMatch = await user.matchPassword(password)


//------------Token------------
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({ success: true, token })
}