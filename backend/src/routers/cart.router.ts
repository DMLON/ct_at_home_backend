import {Router} from 'express';
import { cartController } from '../controllers/index';

const router_cart = Router();

// Return all objects from a selected cart
router_cart.get('/:id/products', cartController.getProductsFromCart);

// Push items into a selected cart
// Neds productCode and quantity in body
router_cart.post('/:id/products', cartController.addProductToCart);

// Delete a selected product from a selected cart
router_cart.delete('/:id/products/:id_prod', cartController.deleteProductFromCart);

// Create new cart and return id
router_cart.post('/', cartController.createCart);

// Delete a cart
router_cart.delete('/:id', cartController.deleteCart)




export default router_cart;