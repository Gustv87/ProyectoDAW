const HTTPCodes = require('../sys/httpCodes')
const productService = require('../services/productService')
const validator = require('../sys/validator')

class ProductController {
    async getProducts(req, res) {
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
            response.data = await productService.getProducts(offset, limit);
            res.status(response.code).send(response);
        } catch (error) {
            response.success = false;
            response.message = "database exception " + error;
            response.code = HTTPCodes.INTERNAL_SERVER_ERROR;
            res.status(response.code).send(response);
        }
    }

    async  getProductById(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }
        try {
            if (validator.isNumber(req.params.id)) {
                response.data = await productService.getProductById(req.params.id);
                res.status(response.code).send(response);
            } else {
                response.success = false;
                response.message = "Tiene que poner un numero";
                response.code = HTTPCodes.BAD_REQUEST;
                res.status(response.code).send(response);
            }

        } catch (error) {
            response.success = false;
            response.message = "database exception " + error;
            response.code = HTTPCodes.INTERNAL_SERVER_ERROR;
            res.status(response.code).send(response);
        }

    }
}

module.exports = new ProductController();