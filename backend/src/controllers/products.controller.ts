import {productService} from '../services/index'

export async function getProducts(req,res){
    if(!req.params.id){
        try{
            const products = await productService.getAllProducts();
            res.status(200).send(products);
        }
        catch(error:any){
            res.status(400).send({error:error});
        }
    }
    else{
        // Sino devuelvo especifico
        try{
            const product = await productService.getProduct(req.params.id);
            res.status(200).send(product);
        }
        catch(error: any){
            res.status(400).send(error.message);
        }
    }
}

export async function createProduct(req,res){
    console.log("POST Create product");
    try{
        const product = await productService.createProduct(req.body);
        res.status(200).send({id:product.id});
    }
    catch(error: any){
        res.status(400).send(error.message);
    }
}

export async function editProduct(req,res){
    const code = req.params.id;
    try{
        const result = await productService.updateProduct(code,req.body);
        res.status(200).send(result);
    }
    catch(error: any){
        res.status(400).send(error.message);
    }
}

export async function deleteProduct(req,res){
    const code = req.params.id;
    try{
        const result = await productService.deleteProduct(code);
        res.status(200).send(result);
    }
    catch(error: any){
        res.status(400).send(error.message);
    }
}