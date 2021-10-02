import {productService} from '../services/index.js'

export async function getProducts(req,res){
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
}

export async function 