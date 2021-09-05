import express,{Router} from 'express';
import Container from "../helpers/container";
import validateProduct from '../middlewares/productValidator';
import validateUser from '../middlewares/userValidator';
import Product from '../models/productModel';


const db = new Container('./products.json');
const local_db: Array<Product> = [];
const router_products = Router();


router_products.get('/:id?', async (req,res)=>{
    console.log('GET /products',req.params.id);
    // Si no viene el parametro, devuelvo todos
    if(!req.params.id){
        try{
            const products = await db.getAll();
            res.send(products);
        }
        catch(error){
            res.send({error:error});
        }
    }
    else{
        // Sino devuelvo especifico
        try{
            const product = await db.getById(req.params.id);
            if(product.length == 0)
                res.send({error: 'product not found'});
            else
                res.send(product);
        }
        catch(error){
            res.send({error:error});
        }
    }
    
});

router_products.post('/',validateProduct,validateUser, async (req,res)=>{
    const {name,description,code,photo,price,stock} = req.body;
    let response = {};
    response = {id:-1};
    try{
        const id = await db.save(req.body)//     // console.log('POST /products');
        response = {id:id}
    }
    catch(error: any){
        // console.error(error);
        response = {error:error};
        console.log(error);
    }
    console.log("POST /products");
    try{
        return res.send(response);
    }
    catch(error){
        console.error(error);
    }
    
});

router_products.put('/:id',validateProduct,validateUser,async (req,res)=>{
    
    console.log('PUT /products');
    try{
        const {id, name,description,code,photo,price,stock} = req.body;
        let product = await db.getById(req.params.id);

        if(product.length == 0)
            res.send({error: 'product not found'});
        else{
            product = product[0];
            product.name = name;
            product.description = description;
            product.code = code;
            product.photo = photo;
            product.price = price;
            product.stock = stock;
            const id = await db.save(product);
            res.send(product);
        }
    }
    catch(error){
        console.log(error);
        res.send({error:error});
    }
});

router_products.delete('/:id',validateUser, async (req,res)=>{
    console.log('DELETE /products');
    try{
        await db.deleteById(req.params.id);
        res.send({status:"ok"});
    }
    catch(error){
        console.log(error);
        res.send({error:error});
    }
})


export default router_products;