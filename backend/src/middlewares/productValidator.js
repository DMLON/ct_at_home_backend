import joi from 'joi';

export const productVerification = joi.object({
    id: joi.string(),
    name: joi.string().required(),
    price: joi.number().min(0).required(),
    photo: joi.string(),
    description: joi.string(), 
    code: joi.string().required(), 
    stock: joi.number().min(0).required()
});

/**
 * Middleware that checks if a product is valid. Must have a name, price, photo
 */
async function validateProduct(req,res,next){
    const {body} = req
    try{
        await productVerification.validateAsync(body)
        next();
    }
    catch(error){
        next(error)
    }
}

export default validateProduct;