class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message) // kế thừa cha
        this.statusCode = statusCode // costume thêm lỗi
    }
}

module.exports = ErrorResponse

// super(message) để kế thừa lại hết lỗi của th cha Error,
// và sau đó costume thêm statusCode vào danh sách lỗi

// logic: tạo ra class con kế thừa hết lỗi của class cha
// và tự tạo thêm lỗi cho mình

//trong docs Error thì constructor() của Error nhận vào 1 tham
// số mặc định là Error(message)
// message để mô tả lỗi đang gặp phải