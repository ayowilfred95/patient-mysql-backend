// everytime we send a request to the database or server


class Response {
    constructor(statusCode, httpStatus, message, data) {
        this.timeStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.message = message;
        this.data = data;
    }
}

export default Response;
