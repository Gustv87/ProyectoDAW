const HTTPCodes = require('../sys/httpCodes');
const orderService = require('../services/orderService');
const validator = require('../sys/validator');
const responseFactory = require('../sys/responseFactory');

class OrderController {
    async postOrder(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }

        try {
            let errorMessage = [];
            if (!req.body.cliente_id) {
                errorMessage.push('Parametro cliente_id es requerido.');
            }
            else if (isNaN(req.body.cliente_id)) {
                errorMessage.push('Parametro cliente_id necesita ser entero.');
            }

            if (!req.body.productos) {
                errorMessage.push('Parametro productos es requerido.');
            } else {
                let contieneProductoId = true;
                let productoEsEntero = true;

                let contieneCantidad = true;
                let cantidadEsEntero = true;


                req.body.productos.forEach(producto => {
                    if (!producto.producto_id) {
                        contieneProductoId = false;
                    }
                    else if (isNaN(producto.producto_id)) {
                        productoEsEntero = false;
                    }

                    if (!producto.cantidad) {
                        contieneCantidad = false;
                    }
                    else if (isNaN(producto.cantidad)) {
                        cantidadEsEntero = false;
                    }
                });
                if (!productoEsEntero) {
                    errorMessage.push("Parametro 'producto_id' necesita ser entero");
                }
                if (!contieneProductoId) {
                    errorMessage.push("Para todos los productos es requerido un 'producto_id'");
                }

                if (!cantidadEsEntero) {
                    errorMessage.push("Parametro 'cantidad' necesita ser entero");
                }
                if (!contieneCantidad) {
                    errorMessage.push("Para todos los productos es requerido una 'cantidad'");
                }
            }

            if (errorMessage.length) {
                response.success = false;
                response.code = HTTPCodes.BAD_REQUEST;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }

            await orderService.createOrder(req.body);
        } catch (error) {

        }
        res.send(response);
    }

    async getOrders(req, res) {
        let response = { }
        console.log(req.query);
        try {
             var offset =0;
             var limit = 10;
             var desde = "01-01-1980";
             var hasta = "01-01-3000";
            if(req.query.offset && validator.isNumber(req.query.offset)){
                offset = req.query.offset;
            }
            if(req.query.limit && validator.isNumber(req.query.limit)){
                limit = req.query.limit;
            }

            if(req.query.desde && validator.isDate(req.query.desde)){
                desde = req.query.desde;
            }
            if(req.query.hasta && validator.isDate(req.query.hasta)){
                hasta = req.query.hasta;
            }
           
            response = responseFactory.getResponseStruct(HTTPCodes.OK);
            response.data = await orderService.getOrders(desde,hasta, offset,limit);
            
            res.status(response.code).send(response);
        } catch (error) {
            response = responseFactory.getResponseStruct(HTTPCodes.INTERNAL_SERVER_ERROR);            
            res.status(response.code).send(response);
        }


    }

    async  getOrderById(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }
        try {
            if (validator.isNumber(req.params.id)) {
                response.data = await orderService.getOrderById(req.params.id);
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


    async  deleteOrderById(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }
        try {
            if (validator.isNumber(req.params.id)) {
                response.data = await orderService.deleteOrderById(req.params.id);
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

module.exports = new OrderController();