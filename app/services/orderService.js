const dbManager = new (require('../db/dbmanager'));

class OrderService {
    async createOrder(order) {
        const insertOrderSQL =
            `INSERT INTO ordenes (cliente_id) VALUES (${order.cliente_id})`;

        console.log(order);
        const response = await dbManager.execute('webapi', insertOrderSQL);
        const orderId = response.insertId;

        order.productos.forEach(async producto => {
            const orderProductSQL =
                `INSERT INTO ordenes_productos 
            (orden_id, producto_id, cantidad)
            VALUES
            (${orderId}, ${producto.producto_id}, ${producto.cantidad})`;
            const responseTwo = await dbManager.execute('webapi', orderProductSQL);
            console.log(responseTwo);
        });

        return orderId;
    }

    async updateOrder(order) {

    }

    async getOrders(desde,hasta,offset,limit) {
        const selectSQL =
        
         `SELECT date(fecha) AS fecha, id, cliente_id, estado FROM ordenes WHERE estado =1 
          AND fecha BETWEEN STR_TO_DATE('${desde}', '%d-%m-%Y')
                   AND STR_TO_DATE('${hasta}', '%d-%m-%Y')
          LIMIT ${limit} OFFSET ${offset}`;
          console.log(selectSQL);
        return await dbManager.execute('webapi', selectSQL);
    }

    async getOrderById(orderId) {
        const selectSQL = `SELECT * FROM ordenes WHERE id = ${orderId} `;
        return await dbManager.execute('webapi', selectSQL);
    }
    async deleteOrderById(orderId) {
        const selectSQL = `UPDATE ordenes SET estado=0 WHERE id = ${orderId} `;
        return await dbManager.execute('webapi', selectSQL);
    }
}

module.exports = new OrderService();