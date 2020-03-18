const HTTPCodes = require('../sys/httpCodes');
const vendorService = require('../services/vendorService');
const validator = require('../sys/validator');

class VendorController{
    async getVendors(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }

        try {
            var offset=0;
            var limit = 10;

            if(req.query.offset && validator.isNumber(req.query.offset)){
                offset = req.query.offset;
            }
            if(req.query.limit && validator.isNumber(req.query.limit)){
                limit = req.query.limit;
            }
            response.data = await vendorService.getVendors(offset, limit);
            res.status(response.code).send(response);
        } catch (error) {
            response.success = false;
            response.message = "database exception " + error;
            response.code = HTTPCodes.INTERNAL_SERVER_ERROR;
            res.status(response.code).send(response);
        }
    }
}

module.exports = new VendorController();