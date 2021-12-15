import React, { useEffect, useState } from 'react'
import BackendController from '../helpers/backendController';

export const CartContext = React.createContext();

export const CartProvider = ({defaultValue = [], children}) => {
    const [cart, setCart] = useState(defaultValue);
    const controller = BackendController.CartController;
    const [cartId,setCartId] = useState(null);
    
    const addItem = async (item,quantity) =>{
        // Si el cart Id es 0 es porque no se genero un carrito
        if(cartId === null){
            try{
                debugger;
                var id = await controller.createCart();
                setCartId(id.id);
            }
            catch(err){
                console.log("Unable to create cart");
                return;
            }
        }
        debugger;
        let _id = null;
        if(id?.id != undefined)
            _id = id.id;
        else
            _id = cartId;

        try{
            const itemId= item._id;
            const response = await controller.addProductToCart(_id,itemId,quantity);
        }
        catch(error){
            console.log(error);
            return error;
        }

        try{
            const products = await controller.getAllProducts(_id);
            setCart([...products]);
        }
        catch(error){
            console.error(error);
            return error;
        }        
        
    }


    const removeItem = async (itemId) =>{
        
        try{
            const response = await controller.removeProductFromCart(cartId,itemId);
            const products = await controller.getAllProducts(cartId);
            setCart([...products]);
        }
        catch(error){
            console.error(error);
            return error;
        }  
    }

    const clear = async () =>{
        try{
            const response = await controller.deleteCart(cartId);
            setCartId(0);
            setCart([]);
        }
        catch(error){
            console.error(error);
            return error;
        }  
    }

    const getItem = (itemId) => {
        return cart.find(itemQuantity=>itemQuantity.product.id === itemId);
    }

    const getTotalPrice = ()=>{
        return cart.reduce((sum,itemQuantity)=>sum+itemQuantity.product.price * itemQuantity.quantity,0)
    }

    const getTotalItems = () =>{
        return cart.reduce((sum,itemQuantity)=>sum+itemQuantity.quantity,0)
    }

    return <CartContext.Provider value={{cart,cartId,addItem,removeItem,clear, getItem, getTotalPrice,getTotalItems}}>
        {children}
    </CartContext.Provider>
}
