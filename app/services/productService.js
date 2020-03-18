const dbManager = new (require('../db/dbmanager'));

class ProductService {

    async getProducts(offset,limit) {
        const selectSQL = `SELECT * FROM productos LIMIT ${limit} OFFSET ${offset}`;
        return await dbManager.execute('webapi', selectSQL);  
    }

    async getProductById(productId) {
        const selectSQL = `SELECT * FROM productos WHERE id = ${productId} `;
        return await dbManager.execute('webapi', selectSQL);
    }
}

module.exports = new ProductService();
