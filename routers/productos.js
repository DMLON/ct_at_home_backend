const express = require('express');
const { Router } = express
const container = require('../container');
const validateProduct = require('../middlewares/productValidator');


const db = new container.Container('./products.json');

const router_products = new Router()

router_products.get('/', async (req,res)=>{
    console.log('GET /products');
    try{
        products = await db.getAll();
        res.send(products);
    }
    catch(error){
        res.send({error:error});
    }
    
})

router_products.get('/:id', async (req,res)=>{
    console.log('GET /products',req.params.id);
    try{
        product = await db.getById(req.params.id);
        if(product.length == 0)
            res.send({error: 'product not found'});
        else
            res.send(product);
    }
    catch(error){
        res.send({error:error});
    }
})
router_products.post('/',validateProduct, async (req,res)=>{
    const {title,price,thumbnail} = req.body;
    const id = await db.save({title:title,price:price,thumbnail:thumbnail})

    console.log('POST /products');
    res.send({id:id});
})

router_products.put('/:id',validateProduct,async (req,res)=>{
    
    console.log('PUT /products');
    try{
        const {productId, title,price,thumbnail} = req.body;
        product = await db.getById(req.params.id);

        if(product.length == 0)
            res.send({error: 'product not found'});
        else{
            product = product[0];
            product.title = title;
            product.price = price;
            product.thumbnail = thumbnail;
            const id = await db.save(product);

            //Me tira error al hacer el save, no encuentro la forma de solucionar
            // Parece que se envia el header antes de que se mande todo que deice "Cannot PUT"
            res.send(product);
        }
    }
    catch(error){
        console.log(error);
        res.send({error:error});
    }
})

router_products.delete('/:id',validateProduct, async (req,res)=>{
    console.log('DELETE /products');
    try{
        product = await db.deleteById(req.params.id);
    }
    catch(error){
        console.log(error);
        res.send({error:error});
    }
})

exports.router_products = router_products;