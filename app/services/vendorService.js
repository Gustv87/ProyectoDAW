const dbManager = new (require('../db/dbmanager'));

class VendorService{

    async getVendors(offset,limit) {
        const selectSQL = `SELECT * FROM proveedores LIMIT ${limit} OFFSET ${offset}`;
        return await dbManager.execute('webapi', selectSQL);
    }

    async getVendorsById(vendorId) {
        const selectSQL = `SELECT * FROM proveedores WHERE id = ${vendorId} `;
        return await dbManager.execute('webapi', selectSQL);
    }

    async createVendor(vendor) {
        const insertUserSQL =
            `INSERT INTO proveedores 
            (nombre,direccion,telefono,celular,email)
            VALUES ('${vendor.nombre}','${vendor.direccion}','${vendor.telefono}','${vendor.celular}','${vendor.email}')`;
        return await dbManager.execute('webapi', insertUserSQL);
    }

    async updateVendor(vendorId, vendor) {
        const selectSQL = `UPDATE proveedores
                 SET nombre ='${vendor.nombre}',direccion='${vendor.direccion}',telefono='${vendor.telefono}',celular='${vendor.celular}',email='${vendor.email}'
                 WHERE id = ${vendorId}`;
        console.log(selectSQL);
        return await dbManager.execute('webapi', selectSQL);
    }
}








module.exports = new VendorService();