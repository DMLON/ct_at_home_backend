import { Router } from 'express';
import { cartController } from '../controllers/index.js';
import { checkCartUser } from '../middlewares/cartUserValidator.js';
import { isLogged } from '../middlewares/userValidator.js';

const router_cart = Router();

// Return all objects from a selected cart
router_cart.get('/:id/products', isLogged,checkCartUser,cartController.getProductsFromCart);

// Push items into a selected cart
// Neds productCode and quantity in body
router_cart.post('/:id/products',isLogged, checkCartUser,cartController.addProductToCart);

// Delete a selected product from a selected cart
router_cart.delete('/:id/products/:id_prod', isLogged,checkCartUser,cartController.deleteProductFromCart);

// Create new cart and return id
router_cart.post('/', isLogged,cartController.createCart);

// Delete a cart
router_cart.delete('/:id', isLogged,checkCartUser,cartController.deleteCart)

// Sends a buy request to the cart
router_cart.post('/buy/:id', isLogged,checkCartUser,cartController.buyCart);


export default router_cart;