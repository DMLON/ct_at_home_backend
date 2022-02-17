import {Router} from 'express';
import isUserAdmin from '../middlewares/userAdminValidator.js';
import {productsController} from "../controllers/index.js"

const router_messages = Router();

// Get a product by id or all products if none is given
router_messages.get('/:id?',productsController.getProducts);

// Create new product with body info 
router_messages.post('/',isUserAdmin, productsController.createProduct);


// Edit product via ID 
router_messages.put('/:id',isUserAdmin,productsController.editProduct);

// Delete product via ID
router_messages.delete('/:id',isUserAdmin, productsController.deleteProduct)
