// định nghĩa error handler middleware cũng giống như các middlware khác
// ngoại trừ sẽ có 4 argument(err, req, res, next) thay vì 3

const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    console.log('----------ERROR------------');
    console.log('err:' + err);
    console.log('err.name:' + err.name);
    console.log(`err.message: ${err.message}`);
    console.log(`err.statusCode: ${err.statusCode}`);

    let error = { ...err } //lỗi từ các tham số sẽ được truyền vào err
    error.message = err.message

    if (err.code === 11000) { // 11000 là lỗi duplicate của mongoose
        console.log(err.errors);
        const message = `Duplicate Field Value!`
        error = new ErrorResponse(message, 400)
    }

    if (err.name === 'ValidationError') { // tên lỗi validate của mongoose
        const message = Object.values(err.errors).map(value => {
            console.log('message: ' + value);
            return value
        })
        console.log(err.errors);
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
        statusCode: error.statusCode
    })
}

module.exports = errorHandler


//logic: là khi next(error) thì sẽ được chạy vào middleware này để check lỗi

// ở phần define ValidationError, bất kì khi nào bị lỗi validate này thì
// ta luôn nhận được 1 object chứa rất nhiều nested object(obj lồng nhau)
// nên muốn add message ta phải map qua object