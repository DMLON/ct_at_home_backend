import {Router} from 'express';
import validateProduct from '../middlewares/productValidator.js';
import validateUser from '../middlewares/userValidator.js';
import {productsController} from "../controllers/index.js"

const router_products = Router();

// Get a product by id
router_products.get('/:id?',productsController.getProducts);

// Create new product with body info
router_products.post('/',validateProduct,validateUser, productsController.createProduct);

// Edit product via ID
router_products.put('/:id',validateProduct,validateUser,productsController.editProduct);

// Delete product via ID
router_products.delete('/:id',validateUser, productsController.deleteProduct)


export default router_products;