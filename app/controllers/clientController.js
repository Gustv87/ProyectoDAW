const HTTPCodes = require('../sys/httpCodes');
const validator = require('../sys/validator');
const ClientService = require('../services/clientService');


class ClientController {

    async getClient(req, res) {

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

            response.data = await ClientService.getClient(offset, limit);
            res.status(response.code).send(response);
        } catch (error) {
            response.success = false;
            response.message = "database exception " + error;
            response.code = HTTPCodes.INTERNAL_SERVER_ERROR;
            res.status(response.code).send(response);
        }
    }

    async  getClientById(req, res) {
        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }
        try {
            if (validator.isNumber(req.params.id)) {
                response.data = await ClientService.getClientById(req.params.id);
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
    async postClient(req, res) {

        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }

        try {
            let errorMessage = [];

            if (!req.body.telefono) {
                errorMessage.push('Parametro telefono del cliente requerido');
            } else if (isNaN(req.body.telefono)) {
                errorMessage.push('Parametro Telefono tiene que ser entero');
            } 
            

            if (!req.body.celular) {
                errorMessage.push('Parametro celular del cliente es requerido');
            } else if (isNaN(req.body.celular)) {
                errorMessage.push('Parametro celular tiene que ser entero');
            }

            if (!req.body.nombre) {
                errorMessage.push('Parametro nombre del cliente es requerido');
            } else if (isText(req.body.nombre)) {
                errorMessage.push('Parametro tiene que ser solo letras')
            }

            if (!req.body.direccion) {
                errorMessage.push('Parametro direccion del cliente es requerido');
            }

            if (!req.body.email) {
                errorMessage.push('Parametro email del cliente es requerido');
            } else if (isEmailAddress(req.body.email)) {
                errorMessage.push('El formato del email es incorrecto  ejemplo@ejemplo.com');
            }

            let telefonoCorrecto = true;
            let celularCorrecto = true;
            let nombreCorrecto = true;
            let direccionCorrecta = true;
            let emailcorrecto = true;

            req.body.clientes.forEach(client => {
                if (!client.telefono) {
                    telefonoCorrecto = false;
                } else if (isNaN(client.telefono)) {
                    telefonoCorrecto = false;
                }

                if (!client.celular) {
                    celularCorrecto = false;
                } else if (isNaN(client.celular)) {
                    celularCorrecto = false;
                }

                if (!client.nombre) {
                    nombreCorrecto = false;
                } else if (isText(client.nombre)) {
                    nombreCorrecto = false;
                }

                if (!client.direccion){
                    direccionCorrecta = false;
                }

                if (!client.email){
                    emailcorrecto = false;
                } else if (isEmailAddress(client.email)){
                    emailcorrecto = false;
                }
            });

            if(!telefonoCorrecto){
                errorMessage.push("El parametro Telefono nesecita ser entero");
            }
            if(!celularCorrecto){
                errorMessage.push("El parametro Celular necesita ser entero");
            }
            if(!nombreCorrecto){
                errorMessage.push("El parametro Nombre tiene que ser solo letras");
            }
            if(!emailcorrecto){
                errorMessage.push("El parametro Email no es correcto ejemplo: ejemplo@ejemplo.com")
            }
            if (errorMessage.length) {
                response.success = false;
                response.code = HTTPCodes.BAD_REQUEST;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }

            await ClientService.createClient(req.body);
        } catch (error) {

        }
        res.send(response);
    }

    async putClient(req, res) {

        let response = {
            success: true,
            message: 'success',
            code: HTTPCodes.OK
        }

        try {
            let errorMessage = [];
            if (!req.params.id) {
                errorMessage.push('Id del Ciente es requerido');
            }
            else if (!validator.isNumber(req.params.id)) {
                errorMessage.push('Id debe de ser entero');

            }
            req.body.nombre = req.body.nombre.trim();
            req.body.telefono = req.body.telefono.trim();
            req.body.celular = req.body.celular.trim();
            req.body.direccion = req.body.direccion.trim();
            req.body.email = req.body.email.trim();

            if (errorMessage.length) {
                response.success = false;
                response.code = HTTPCodes.BAD_REQUEST;
                response.message = errorMessage;
                res.status(response.code).send(response);
            }

            await ClientService.updateClient(req.params.id, req.body);
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

module.exports = new ClientController();
