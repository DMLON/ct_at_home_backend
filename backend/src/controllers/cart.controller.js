import { userModel } from '../models/users.model.js';
import {cartService} from '../services/index.js'
import { sendEmail } from '../utils/emailSender.js';
import { GenericError } from '../utils/genericError.js';
import { loggerDefault, loggerErrors } from '../utils/loggers.js';
import { prettyfyCart } from "../utils/prettyfyObjects.js";
import { sendMessage, sendMessageAdmin } from "../utils/whatsappSender.js";



export async function getProductsFromCart(req,res){
    const cartId = req.params.id;
    try{
        const products = await cartService.getAllProducts(cartId);
        res.status(200).json(products);
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(error?.status || 400).json(error);
    }
}

export async function createCart(req,res){
    try{
        loggerDefault.info(`Creating new cart`);
        // Check if user already has a cart
        // Two options:
        // 1) If user has a cart, return it, else create a new one
        // 2) If user has a cart, raise an error
        let cart = null
        cart = await cartService.getUserCart(req.user.id);
        if(!cart){
            // throw new GenericError({status:400,message:"User already has a cart"});
            cart = await cartService.createCartForUser(req.user);
        }
        
        res.status(200).json({id:cart.id});
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(error?.status || 400).json(error);
    }
}

export async function addProductToCart(req,res){
    const cartId = req.params.id;
    const {productId,quantity} = req.body;
    try{
        await cartService.addProductToCart(cartId,productId,quantity);
        res.status(200).json({status:200,message:"Product added to cart"});
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(error?.status || 400).json(error);
    }
}

export async function deleteProductFromCart(req,res){
    const cartId = req.params.id;
    const productCode= req.params.id_prod;
    try{
        await cartService.deleteProductFromCart(cartId,productCode);
        res.status(200).json({status:200,message:"Product deleted from cart"});
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(error?.status || 400).json(error);
    }
}

export async function deleteCart(req,res){
    const cartId = req.params.id;
    try{
        const result = await cartService.deleteCart(cartId,req.user.id);
        res.status(200).json(result);
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(error?.status || 400).json(error);
    }
}

export async function buyCart(req,res){
    const cartId = req.params.id;
    try{
        const result = await cartService.buyCart(cartId,req.user._id);
        const cart = await cartService.getCartPopulated(cartId)
        const content = prettyfyCart(cart);

        // Send the cart info to the user whatsapp, then to the admin whatsapp and admin email
        try{
            await sendEmail(`New order from ${req.user.firstName} ${req.user.lastName} - ${req.user.email}`,content);
            loggerDefault.info(`New order from ${req.user.firstName} ${req.user.lastName} - ${req.user.email}`);
        }
        catch(error){
            loggerErrors.error(error.message);
        }

        try{
            sendMessageAdmin(content);
            loggerDefault.info("Message to admin sent")
        }
        catch(error){
            loggerErrors.error(error.message);
        }

        try{
            sendMessage(req.user.phone,"Your order has been placed");
            loggerDefault.info(`Sent message to user whatsapp ${req.user.phone}`);
        }
        catch(error){
            loggerErrors.error(error.message);
        }


        loggerDefault.info("Order placed");
        res.status(200).json({error:false,status:"Order placed"});
        
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(error?.status || 400).json(error);
    }
}