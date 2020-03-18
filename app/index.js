const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ extended: true }));


const productRoutes = require('../app/routes/productRoutes');
const orderRoutes = require('../app/routes/orderRoutes');
const userRoutes = require('../app/routes/userRoute');
const vendorRoutes = require('../app/routes/vendorRoute');




app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vendor',vendorRoutes);

const port = 3000;
app.listen(port,
    () =>
        console.log(`Started server at http://localhost:${port}/api/order`));