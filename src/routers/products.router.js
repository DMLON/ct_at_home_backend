import {Router} from 'express';
import {isUserAdmin} from '../middlewares/userValidator.js';
import {productsController} from "../controllers/index.js"

const router_products = Router();

// Get a product by id or all products if none is given
router_products.get('/:id?',productsController.getProducts);

// Create new product with body info 
router_products.post('/',isUserAdmin, productsController.createProduct);


// Edit product via ID 
router_products.put('/:id',isUserAdmin,productsController.editProduct);

// Delete product via ID
router_products.delete('/:id',isUserAdmin, productsController.deleteProduct)


export default router_products;