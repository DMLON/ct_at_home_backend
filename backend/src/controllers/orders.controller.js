import { ordersService } from "../services/index.js";
import { getAllRequests, getRequestsFromUser } from "../services/orders.services.mongo.js";
import { loggerDefault, loggerErrors } from "../utils/loggers.js";

// Admin function
export const getOrders = async (req, res) => {
    try {
        if (!req.params.userId) {
            const requests = await getAllOrdersWithUsers();
            res.status(200).json(requests);
        } else {
            // Sino devuelvo especifico
            const requests = await getOrdersFromUser(req.params.userId);
            res.status(200).json(requests);
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
}