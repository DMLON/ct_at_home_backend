import {Router} from 'express';
import {ordersController} from "../controllers/index.js"
import { checkCartUser } from '../middlewares/cartUserValidator.js';
import { isLogged, isUserAdmin } from '../middlewares/userValidator.js';

const router_orders = Router();

// Get all orders or orders from a specific user
router_orders.get('/admin/:userId?' ,isLogged, isUserAdmin ,ordersController.getOrders);

router_orders.post('/admin/:id' ,isLogged, isUserAdmin ,ordersController.changeOrderStatus);

router_orders.get('/' ,isLogged, ordersController.getOrdersUser);

router_orders.delete('/:id' ,isLogged, checkCartUser, ordersController.cancelOrderUser);


export default router_orders;