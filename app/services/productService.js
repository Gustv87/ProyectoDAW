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

    async createProduct(product){
        const insertProductSql =
        `INSERT INTO productos 
        (nombre,marca,descripcion,categoria)
        VALUES('${product.nombre}','${product.marca}','${product.descripcion}','${product.categoria}')`;
        return await dbManager.execute('webapi', insertProductSql);
    }

    async updateProduct(productId, product){
        const updateProductSQL = `UPDATE productos
        SET nombre = '${product.nombre}', marca= '${product.marca}', descripcion ='${product.descripcion}', categoria = '${product.categoria}'
        WHERE id = ${productId}`;
        console.log(updateProductSQL);
        return await dbManager.execute('webapi',updateProductSQL);
    }
}

module.exports = new ProductService();
