import express,{Router} from 'express';
import Container from '../helpers/container';
import Cart from "../models/cartModel"
import Product from '../models/productModel';

const router_cart = Router();

const db_cart = new Container<Cart>(Cart, './cart.json');
const db_products = new Container<Product>(Product,'./products.json');

// Helper function to get a product by id, used to validate a product id
const getProduct = async (id)=>{
    try{
        let product = await db_products.getById(id);
        if(product == null){
            return {error:"Product does not exist"};
        }
        return product;
    }
    catch(error){
        return {error:"Product does not exist"};
    }
}

// Helper function to get a cart by id
const getCart = async (id)=>{
    try{
        let cart = await db_cart.getById(id);
        if(cart == null){
            return {error:"Cart does not exist"};
        }
        return cart;
    }
    catch(error){
        return {error:"Cart does not exist"};
    }
}

// Return all objects from a selected cart
router_cart.get('/:id/products', async (req,res)=>{
    console.log(`GET /cart/${req.params.id}/products`);
    const cartOrError = await getCart(req.params.id);
    if(cartOrError instanceof Cart){
        const cart = cartOrError
        res.status(200).send(JSON.stringify(cart.products));
    }
    else{
        const error = cartOrError;
        res.status(400).send(error);
    }
});

// Push items into a selected cart
router_cart.post('/:id/products', async (req,res)=>{
    console.log(`POST /cart/${req.params.id}/products`);
    console.log(req.body);
    const {productId,quantity} = req.body;
    const cartOrError = await getCart(req.params.id);
    if(cartOrError instanceof Cart){
        const cart = cartOrError;
        let product = await getProduct(productId);
        if(product instanceof Product){
            if(quantity > product.stock){
                res.status(409).send({status:"Requested quantity above item stock"});
            }
            else{
                const success = cart.addToCart(product,quantity);
                if(success){
                    const id = await db_cart.save(cart);
                    res.status(200).send({status:"ok"});
                }
                else{
                    res.status(409).send({status:"Item already in cart"});
                }
            }
        }
        else{
            res.send(product);
        }
    }
    else{
        const error = cartOrError
        res.status(400).send(error);
    }
});

// Delete a selected product from a selected cart
router_cart.delete('/:id/products/:id_prod', async (req,res)=>{
    console.log(`DELETE /cart/${req.params.id}/products/${req.params.id_prod}`);
    const cartOrError = await getCart(req.params.id);

    if(cartOrError instanceof Cart){
        const cart = cartOrError;
        const success = cart.removeProduct(+req.params.id_prod);
        if(success){
            const id = await db_cart.save(cart);
            res.status(200).send({status:"ok"});
        }
        else{
            res.status(400).send({error:"invalid product id"});
        }
    }
    else{
        const error = cartOrError;
        res.status(400).send(error);
    }

});


// Create new cart and return id
router_cart.post('/', async (req,res)=>{
    let response = {};
    response = {id:-1};
    const cart = new Cart();
    try{
        const id = await db_cart.save(cart)//     // console.log('POST /products');
        response = {id:id}
    }
    catch(error: any){
        // console.error(error);
        response = {error:error};
        console.log(error);
    }
    console.log("POST /cart");
    try{
        return res.status(200).send(response);
    }
    catch(error){
        console.error(error);
        return res.status(400).send(error);
    }
    
});

// Delete a cart
router_cart.delete('/:id', async (req,res)=>{
    console.log('DELETE /cart');
    try{
        await db_cart.deleteById(req.params.id);
        res.status(200).send({status:"ok"});
    }
    catch(error){
        console.log(error);
        res.status(400).send({error:error});
    }
})




export default router_cart;