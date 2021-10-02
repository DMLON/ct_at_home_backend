import express  from "express";
import router_cart from "./routers/cart.router";
import router_products from "./routers/products.router";
import "../database/mongo"
import dotenv from "dotenv"
dotenv.config();


const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',router_products)
app.use('/api/cart',router_cart)


app.get('*', function(req, res){
    res.send({ error : -2, descripcion: `${req.originalUrl} Not found`});
});

const PORT = process.env.PORT ? process.env.PORT : 8080;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT }`);
});