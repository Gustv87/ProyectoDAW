const dbManager = new (require('../db/dbmanager'));

class UserService {

    async createUser(user) {
        const insertUserSQL =
            `INSERT INTO usuarios 
            (nombre,email,contrasena,usuario,rol)
            VALUES ('${user.nombre}','${user.email}','${user.contrasena}','${user.usuario}','${user.rol}')`;
        return await dbManager.execute('webapi', insertUserSQL);
    }

    async updateUser(userId,user) {
        const selectSQL = `UPDATE usuarios
                 SET nombre ='${user.nombre}',email='${user.email}',contrasena='${user.contrasena}',usuario='${user.usuario}',rol='${user.rol}'
                 WHERE id = ${userId}`;
                 console.log(selectSQL);
        return await dbManager.execute('webapi', selectSQL);
    }

    async getUsers(offset, limit) {
        const selectSQL = `SELECT * FROM usuarios LIMIT ${limit} OFFSET ${offset} `;
        return await dbManager.execute('webapi', selectSQL);
    }

    async getUserById(userId) {
        const selectSQL = `SELECT * FROM usuarios WHERE id = ${userId} `;
        return await dbManager.execute('webapi', selectSQL);
    }

    async deleteUserById(userId) {
        const selectSQL = `DELETE  FROM usuarios WHERE id = ${userId} `;
        return await dbManager.execute('webapi', selectSQL);
    }
}


module.exports = new UserService();