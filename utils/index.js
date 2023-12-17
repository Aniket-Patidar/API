exports.sendResponse = (res, data, message, success, code) => {
    const responseObj = {
        responseData: data,
        message,
        success,
        responseCode: code
    };
    res.format({
        json: () => {
            res.send(responseObj);
        }
    })
}

exports.sendError = (res, data, msg) => {
    if (!res) {
        return false;
    }
    this.sendResponse(res, data, msg || "Request Failed", false, 400);
}