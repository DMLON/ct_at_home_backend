import { UserDTO } from "../database/dtos/user.dto.js";
import { ordersService } from "../services/index.js";
import { loggerDefault, loggerErrors } from "../utils/loggers.js";

// Admin function
export const getOrders = async (req, res) => {
    try {
        if (!req.params.userId) {
            const orders = await ordersService.getAllOrdersWithUsers();
            // Remove unnecesary information from user
            if(orders.length > 0){
                orders.forEach(order => {order.user = new UserDTO(order.user)});
            }
            res.status(200).json(orders);
        } else {
            // Sino devuelvo especifico
            const orders = await ordersService.getOrdersFromUser(req.params.userId);
            res.status(200).json(orders);
        }
    } catch (error) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
};

// Get from orders from current logged user
export const getOrdersUser = async (req, res) => {
    try {
        const order = await ordersService.getOrdersFromUser(req.user.id);
        res.status(200).json(order);
    } catch (err) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
};

// Admin function - Change status from an order given a query parameter status
export const changeOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.query;
        const order = await ordersService.changeOrderStatus(id, status);
        res.status(200).json(order);
    } catch (err) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
};

// User Function
export const cancelOrderUser = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await ordersService.changeOrderStatus(id, "cancelled");
        res.status(200).json(order);
    } catch (err) {
        loggerErrors.error(error.message);
        res.status(error?.status || 400).json(error);
    }
};
