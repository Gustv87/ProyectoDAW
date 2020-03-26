const dbManager = new (require('../db/dbmanager'));


class clientService {

    async getClient(offset, limit) {
        const selectSQL = `SELECT * FROM clientes LIMIT ${limit} OFFSET ${offset} `;
        return await dbManager.execute('webapi', selectSQL);
    }
    async getClientById(clientId) {
        const selectSQL = `SELECT * FROM clientes WHERE id = ${clientId} `;
        return await dbManager.execute('webapi', selectSQL);
    }

    async createClient(client) {
        const insertSQL =
            `INSERT INTO clientes 
            (nombre,telefono,celular,direccion,email)
            VALUES ('${client.nombre}','${client.telefono}','${client.celular}','${client.direccion}','${client.email}')`;
        return await dbManager.execute('webapi', insertSQL);
    }

    async updateClient(clientId, client) {
        const selectSQL = `UPDATE clientes
                 SET nombre ='${client.nombre}',telefono='${client.telefono}',celular='${client.celular}',direccion='${client.direccion}',email='${client.email}'
                 WHERE id = ${clientId}`;
        console.log(selectSQL);
        return await dbManager.execute('webapi', selectSQL);
    }

}

module.exports = new clientService();

