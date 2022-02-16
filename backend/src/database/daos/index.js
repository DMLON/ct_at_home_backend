import UsersDaoMongo from './users.dao';
import CartsDaoMongo from './carts.dao';
import MessagesDaoMongo from './messages.dao';
import OrdersDaoMongo from './orders.dao';
import ProductsDaoMongo from './products.dao';

const usersDao = new UsersDaoMongo();
const cartsDao = new CartsDaoMongo();
const messagesDao = new MessagesDaoMongo();
const ordersDao = new OrdersDaoMongo();
const productsDao = new ProductsDaoMongo();

export default usersDao;
export default cartsDao;
export default messagesDao;
export default ordersDao;
export default productsDao;

