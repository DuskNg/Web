require('dotenv').config({ path: './config.env' })

const express = require('express')
const connectDB = require('./config/db')
const { protect } = require('./middlewares/auth')
const errorHandler = require('./middlewares/error')

const app = express()

//db
connectDB()

//middlerware: tích hợp hỗ trợ cho Post lấy được data trả về từ browser
app.use(express.urlencoded({
    limit: '200mb', extended: true
}),
);
app.use(express.json({limit: '200mb'}))

//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', protect, require('./routes/private'))
app.use('/api/public', require('./routes/public'))

//Error Handler( should be last of middlewares)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error:${err}`);
    server.close(() => process.exit(1))
})