import express,{Router} from 'express';
import Container from '../helpers/container';
import Cart from "../models/cartModel"
import Product from '../models/productModel';

const router_cart = Router();

const db_cart = new Container('./cart.json');
const db_products = new Container('./products.json');

// Helper function to get a product by id, used to validate a product id
const getProduct = async (id)=>{
    try{
        let product: object = await db_products.getById(id);
        return Product.fromJSON(product[0]);
    }
    catch(error){
        console.log(error);
        return {error:"Product does not exist"};
    }
}

// Helper function to get a cart by id
const getCart = async (id)=>{
    try{
        let cart: object = await db_cart.getById(id);
        return Cart.fromJSON(cart[0]);
    }
    catch(error){
        console.log(error);
        return {error:error};
    }
}

// Return all objects from a selected cart
router_cart.get('/:id/products', async (req,res)=>{
    console.log(`GET /cart/${req.params.id}/products`);
    const cart = await getCart(req.params.id);
    if(cart instanceof Cart){
        res.send(JSON.stringify(cart.products));
    }
    else{
        res.send(cart);
    }
});

// Push items into a selected cart
router_cart.post('/:id/products', async (req,res)=>{
    console.log(`POST /cart/${req.params.id}/products`);
    const {productId} = req.body;
    const cart = await getCart(req.params.id);
    console.log(cart);
    if(cart instanceof Cart){
        let product = await getProduct(productId);
        if(product instanceof Product){
            const success = cart.addToCart(productId);
            if(success){
                const id = await db_cart.save(cart);
                res.send({status:"ok"});
            }
            else{
                res.send({status:"Item already in cart"});
            }
        }
        else{
            res.send(product);
        }
    }
    else{
        res.send(cart);
    }
});

// Delete a selected product from a selected cart
router_cart.delete('/:id/products/:id_prod', async (req,res)=>{
    console.log(`DELETE /cart/${req.params.id}/products/${req.params.id_prod}`);
    const cart = await getCart(req.params.id);

    if(cart instanceof Cart){
        const success = cart.removeProduct(+req.params.id_prod);
        if(success){
            const id = await db_cart.save(cart);
            res.send({status:"ok"});
        }
        else{
            res.send({error:"invalid product id"});
        }
    }
    else{
        res.send(cart);
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
        return res.send(response);
    }
    catch(error){
        console.error(error);
    }
    
});

// Delete a cart
router_cart.delete('/:id', async (req,res)=>{
    console.log('DELETE /cart');
    try{
        await db_cart.deleteById(req.params.id);
        res.send({status:"ok"});
    }
    catch(error){
        console.log(error);
        res.send({error:error});
    }
})




export default router_cart;