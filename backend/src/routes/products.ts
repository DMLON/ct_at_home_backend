import express,{Router} from 'express';
import Container from "../helpers/container";
import validateProduct from '../middlewares/productValidator';
import validateUser from '../middlewares/userValidator';
import Product from '../../database/models/FileSystem/productModel';


const db = new Container<Product>(Product,'./products.json');
const router_products = Router();


router_products.get('/:id?', async (req,res)=>{
    console.log('GET /products',req.params.id);
    // Si no viene el parametro, devuelvo todos
    if(!req.params.id){
        try{
            const products = await db.getAll();
            res.status(200).send(products);
        }
        catch(error){
            res.status(400).send({error:error});
        }
    }
    else{
        // Sino devuelvo especifico
        try{
            const product = await db.getById(req.params.id);
            if(product == null)
                res.status(409).send({error: 'product not found'});
            else
                res.status(200).send(product);
        }
        catch(error){
            res.status(400).send({error:error});
        }
    }
    
});

router_products.post('/',validateProduct,validateUser, async (req,res)=>{
    let response = {};
    response = {id:-1};
    try{
        const product = new Product().deserialize(req.body);
        const id = await db.save(product)//     // console.log('POST /products');
        response = {id:id}
    }
    catch(error: any){
        // console.error(error);
        response = {error:error};
        console.log(error);
    }
    console.log("POST /products");
    try{
        return res.status(200).send(response);
    }
    catch(error){
        console.error(error);
        return res.status(200).send(error);
    }
    
});

router_products.put('/:id',validateProduct,validateUser,async (req,res)=>{
    
    console.log('PUT /products');
    try{
        const {id, name,description,code,photo,price,stock} = req.body;
        let product = await db.getById(req.params.id);

        if(product == null)
            res.status(409).send({error: 'product not found'});
        else{
            product.name = name;
            product.description = description;
            product.code = code;
            product.photo = photo;
            product.price = price;
            product.stock = stock;
            const id = await db.save(product);
            res.status(200).send(product);
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({error:error});
    }
});

router_products.delete('/:id',validateUser, async (req,res)=>{
    console.log('DELETE /products');
    try{
        await db.deleteById(req.params.id);
        res.status(200).send({status:"ok"});
    }
    catch(error){
        console.log(error);
        res.status(400).send({error:error});
    }
})


export default router_products;