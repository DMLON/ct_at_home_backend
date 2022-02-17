import { productService } from "../services/index.js";
import { GenericError } from "../utils/genericError.js";
import { loggerDefault, loggerErrors } from "../utils/loggers.js";

export async function getProducts(req, res) {
    if (!req.params.id) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            loggerErrors.error(error.message);
            res.status(error?.status || 400).json(error);
        }
    } else {
        // Sino devuelvo especifico
        try {
            const product = await productService.getProduct(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            loggerErrors.error(error.message);
            res.status(error?.status || 400).json(error);
        }
    }
}

export async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ id: product._id });
    } catch (error) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
}

export async function editProduct(req, res) {
    const code = req.params.id;
    try {
        const result = await productService.updateProduct(code, req.body);
        res.status(201).json(result);
    } catch (error) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
}

export async function deleteProduct(req, res) {
    const code = req.params.id;
    try {
        const result = await productService.deleteProduct(code);
        if(result){
            res.status(200).json({message: "Product deleted"});
        }
        else{
            // Should not happen
            throw GenericError({status:400,message:"Unknown error"});
        }
    } catch (error) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
}
