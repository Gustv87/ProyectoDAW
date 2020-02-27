const dbManager = new (require('../db/dbmanager'));

class ProductService {

    async getProducts() {
        const selectSQL = `SELECT * FROM productos`;
        return await dbManager.execute('webapi', selectSQL);  
    }
}

module.exports = new ProductService();
