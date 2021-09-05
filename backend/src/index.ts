import express  from "express";
import router_cart from "./routes/cart";
import router_products from "./routes/products";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',router_products)
app.use('/api/cart',router_cart)


app.get('/', (req, res) => {

});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on $${PORT }`);
});