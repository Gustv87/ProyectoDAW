const dbManager = new (require('../db/dbmanager'));

class ProductService {

    async getProducts() {
        const selectSQL = `SELECT * FROM productos`;
       console.log(await dbManager.execute('webapi', selectSQL)); return  
    }
}

module.exports = new ProductService();
