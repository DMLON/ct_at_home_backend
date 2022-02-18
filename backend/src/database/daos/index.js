import UsersDaoMongo from './users.dao.js';
import CartsDaoMongo from './carts.dao.js';
import MessagesDaoMongo from './messages.dao.js';
import OrdersDaoMongo from './orders.dao.js';
import ProductsDaoMongo from './products.dao.js';

export const usersDao = new UsersDaoMongo();
export const cartsDao = new CartsDaoMongo();
export const messagesDao = new MessagesDaoMongo();
export const ordersDao = new OrdersDaoMongo();
export const productsDao = new ProductsDaoMongo();
