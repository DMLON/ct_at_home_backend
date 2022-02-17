import UsersDaoMongo from './users.dao';
import CartsDaoMongo from './carts.dao';
import MessagesDaoMongo from './messages.dao';
import OrdersDaoMongo from './orders.dao';
import ProductsDaoMongo from './products.dao';

export const usersDao = new UsersDaoMongo();
export const cartsDao = new CartsDaoMongo();
export const messagesDao = new MessagesDaoMongo();
export const ordersDao = new OrdersDaoMongo();
export const productsDao = new ProductsDaoMongo();
