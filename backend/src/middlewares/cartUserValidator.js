import { usersDao } from "../database/daos/index.js";
import { GenericError } from "../utils/genericError.js";


// Checks if the user has the corresponding cart
export const checkCartUser = async (req, res, next) => {
    if (!req.user){
        res.status(401).json(new GenericError({status:401,message:'You must be logged in to access this page'}));
        return
    }

    const user = await usersDao.getById(req.user.id)
    if (!user){
        res.status(401).json(new GenericError({status:401,message:'User not found'}));
        return;
    }
    
    
    if (user.cart != req.params.id){
        res.status(404).json(new GenericError({status:404,message:'Cart not found on user'}));
        return;
    }
    // All good
    next();

}

// Checks if the user has the corresponding cart
export const checkOrderUser = async (req, res, next) => {
    if (!req.user){
        next(new GenericError({status:401,message:'You must be logged in to access this page'}));
        return
    }

    const user = await usersDao.getById(req.user.id)
    if (!user){
        next(new GenericError({status:401,message:'User not found'}));
        return;
    }
    
    const order = user.orders.filter(order => order.id == req.params.id)
    if (order.length == 0){
        next(new GenericError({status:404,message:'Order not found on user'}));
        return;
    }
    // All good
    next();

}