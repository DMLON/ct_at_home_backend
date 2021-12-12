import { userModel } from '../models/users.model.js';
import {cartService} from '../services/index.js'
import { sendEmail } from '../utils/emailSender.js';
import { loggerDefault, loggerErrors } from '../utils/loggers.js';
import { prettyfyCart } from "../utils/prettyfyObjects.js";
import { sendMessage, sendMessageAdmin } from "../utils/whatsappSender.js";



export async function getProductsFromCart(req,res){
    const cartId = req.params.id;
    try{
        const products = await cartService.getAllProducts(cartId);
        res.status(200).send(products);
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(400).send({error:true,status:error.message});
    }
}

export async function createCart(req,res){
    try{
        loggerDefault.info(`Creating new cart`);

        if (req.user){
            const cart = await cartService.createCart();
            const user = await userModel.findById(req.user._id);
            user.carts.push(cart._id);
            await user.save();
            res.status(200).send({id:cart.id});
        }
        else{
            throw new Error('User not found');
        }
        
        
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(400).send({error:true,status:error.message});
    }
}

export async function addProductToCart(req,res){
    const cartId = req.params.id;
    const {productId,quantity} = req.body;
    try{
        const result = await cartService.addProductToCart(cartId,productId,quantity);
        res.status(200).send(result);
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(400).send({error:true,status:error.message});
    }
}

export async function deleteProductFromCart(req,res){
    const cartId = req.params.id;
    const productCode= req.params.id_prod;
    try{
        const result = await cartService.deleteProductFromCart(cartId,productCode);
        res.status(200).send(result);
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(400).send({error:true,status:error.message});
    }
}

export async function deleteCart(req,res){
    const cartId = req.params.id;
    try{
        const result = await cartService.deleteCart(cartId);
        res.status(200).send(result);
    }
    catch(error){
        loggerErrors.error(error.message)
            res.status(400).send({error:true,status:error.message});
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
        res.status(200).send({error:false,status:"Order placed"});
        
    }
    catch(error){
        loggerErrors.error(error.message)
        res.status(400).send({error:true,status:error.message});
    }
}