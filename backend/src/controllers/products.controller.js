import {productService} from '../services/index.js'
import { loggerDefault, loggerErrors } from '../utils/loggers.js';

export async function getProducts(req,res){
    loggerDefault.info("GET Products");
    if(!req.params.id){
        try{
            const products = await productService.getAllProducts();
            res.status(200).send(products);
        }
        catch(error){
            loggerErrors.error(error.message)
            res.status(400).send({error:true,status:error.message});
        }
    }
    else{
        // Sino devuelvo especifico
        try{
            const product = await productService.getProduct(req.params.id);
            res.status(200).send(product);
        }
        catch(error){
            loggerErrors.error(error.message)
            res.status(400).send({error:true,status:error.message});
        }
    }
}

export async function createProduct(req,res){
    
    loggerDefault.info("POST Create product");
    try{
        const product = await productService.createProduct(req.body);
        res.status(200).send({id:product._id});
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(400).send({error:true,status:error.message});
    }
}

export async function editProduct(req,res){
    

    const code = req.params.id;
    loggerDefault.info(`PUT Products ${code}`);
    try{
        const result = await productService.updateProduct(code,req.body);
        res.status(200).send(result);
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(400).send({error:true,status:error.message});
    }
}

export async function deleteProduct(req,res){

    const code = req.params.id;
    loggerDefault.info(`DELETE Products ${code}`);

    try{
        const result = await productService.deleteProduct(code);
        res.status(200).send(result);
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(400).send({error:true,status:error.message});
    }
}