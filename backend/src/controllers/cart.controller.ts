import {cartService} from '../services/index'

export async function getProductsFromCart(req,res){
    const cartId = req.params.id;
    try{
        const products = await cartService.getAllProducts(cartId);
        res.status(200).send(products);
    }
    catch(error:any){
        res.status(400).send({error:error});
    }
}

export async function createCart(req,res){
    try{
        const cart = await cartService.createCart();
        res.status(200).send({id:cart.id});
    }
    catch(error: any){
        res.status(400).send(error.message);
    }
}

export async function addProductToCart(req,res){
    const cartId = req.params.id;
    const {productCode,quantity} = req.body;
    try{
        const result = await cartService.addProductToCart(cartId,productCode,quantity);
        res.status(200).send(result);
    }
    catch(error: any){
        res.status(400).send(error.message);
    }
}

export async function deleteProductFromCart(req,res){
    const cartId = req.params.id;
    const productCode= req.params.id_prod;
    try{
        const result = await cartService.deleteProductFromCart(cartId,productCode);
        res.status(200).send(result);
    }
    catch(error: any){
        res.status(400).send(error.message);
    }
}

export async function deleteCart(req,res){
    const cartId = req.params.id;
    try{
        const result = await cartService.deleteCart(cartId);
        res.status(200).send(result);
    }
    catch(error: any){
        res.status(400).send(error.message);
    }
}