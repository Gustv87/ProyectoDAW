const dbManager = new (require('../db/dbmanager'));

class UserService{

    async getUsers() {
        const selectSQL = `SELECT * FROM usuarios `;
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