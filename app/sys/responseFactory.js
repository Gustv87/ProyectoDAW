const HTTPCodes = require('./httpCodes');

class responseFactory {


    getResponseStruct(code, message = "") {
        if (code == 200 || code == 201) return {
            code: HTTPCodes.OK,
            success: true,
            message: (message != "") ? message : "ok"
        }

        else if (code == HTTPCodes.BAD_REQUEST ||
             code == HTTPCodes.UNAUTHORIZED || 
             code == HTTPCodes.NOT_FOUND || 
             code == HTTPCodes.FORBIDDEN || 
             code == HTTPCodes.INTERNAL_SERVER_ERROR) return {
            code: code,
            success: false,
            message: (message != "") ? message : "Error code " + code
        }
    }



}


module.exports = new responseFactory();
