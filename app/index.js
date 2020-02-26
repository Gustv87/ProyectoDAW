const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ extended: true }));


const productRoutes = require('../app/routes/productRoutes');



app.use('/api/product', productRoutes);

const port = 3000;
app.listen(port,
    () =>
        console.log(`Started server at http://localhost:${port}/api/order`));