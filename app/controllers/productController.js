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
            var offset = 0;
            var limit = 10;

            if (req.query.offset && validator.isNumber(req.query.offset)) {
                offset = req.query.offset;
            }
            if (req.query.limit && validator.isNumber(req.query.limit)) {
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

    async postProduct(req, res) {

        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }
        try {
            let errorMessage = [];

            if (errorMessage.length) {
                response.success = false;
                response.code = HTTPCodes.BAD_REQUEST;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }

            await productService.createProduct(req.body);
        } catch (error) {

        }
        res.send(response);
    }

    async putProduct(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }

        try {
            let errorMessage = [];
            if (!req.params.id) {
                errorMessage.push('Id del producto es requerido');
            }
            else if (!validator.isNumber(req.params.id)) {
                errorMessage.push('Id debe de ser numero entero');

            }
            req.body.nombre = req.body.nombre.trim();
            req.body.marca = req.body.marca.trim();
            req.body.descripcion = req.body.descripcion.trim();
            req.body.categoria = req.body.categoria.trim();

            if (errorMessage.length) {
                response.success = false;
                response.code = HTTPCodes.BAD_REQUEST;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }

            await productService.updateProduct(req.params.id, req.body);
        } catch (error) {
            console.log(error.sqlMessage);
            if (error.sqlMessage) {
                response.message = error.sqlMessage;
            } else {
                response.message = "Internal Server Error";
            }
            response.code = HTTPCodes.INTERNAL_SERVER_ERROR;
            response.success = false;
        }
        res.status(response.code).send(response);

    }
}

module.exports = new ProductController();