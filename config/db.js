require('dotenv').config({ path: './config.env' })
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tlcvx.mongodb.net/Website?retryWrites=true&w=majority`)
        console.log('Connected DB');
    } catch (error) {
        console.log('Connected DB failure!');
    }
}

module.exports = connectDB