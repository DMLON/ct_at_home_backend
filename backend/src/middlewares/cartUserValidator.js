import { userModel } from "../models/users.model.js";


export const checkCartUser = async (req, res, next) => {
    if (!req.user){
        next(new Error('You must be logged in to access this page'));
        return
    }

    const user =await  userModel.findById(req.user._id)
    if (!user){
        next(new Error('User not found'));
        return;
    }
    
    const cart = user.carts.filter(cart => cart._id == req.params.id)
    if (!cart.length){
        next(new Error('Cart not found on user'));
        return;
    }
    // All good
    next();

}