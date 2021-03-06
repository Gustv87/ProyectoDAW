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

    async  getVendorsById(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }
        try {
            if (validator.isNumber(req.params.id)) {
                response.data = await vendorService.getVendorsById(req.params.id);
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


    async postVendor(req, res) {

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

            await vendorService.createVendor(req.body);
        } catch (error) {

        }
        res.send(response);
    }

    async putVendor(req, res) {
       
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }

        try {
            let errorMessage = [];
            if (!req.params.id) {
                errorMessage.push('Id del proveedor es requerido');
            }
            else if (!validator.isNumber(req.params.id)) {
                errorMessage.push('Id debe de ser entero');

            }
            req.body.nombre = req.body.nombre.trim();
            req.body.direccion = req.body.direccion.trim();
            req.body.telefono = req.body.telefono.trim();
            req.body.celular= req.body.celular.trim();
            req.body.email = req.body.email.trim();
            if (errorMessage.length) {
                response.success = false;
                response.code = HTTPCodes.BAD_REQUEST;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }

            await vendorService.updateVendor(req.params.id, req.body);
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

module.exports = new VendorController();