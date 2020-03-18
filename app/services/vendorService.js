const dbManager = new (require('../db/dbmanager'));

class VendorService{

    async getVendors(offset,limit) {
        const selectSQL = `SELECT * FROM proveedores LIMIT ${limit} OFFSET ${offset}`;
        return await dbManager.execute('webapi', selectSQL);
    }
}








module.exports = new VendorService();