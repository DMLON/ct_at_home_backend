
import ContainerMongoDB from "../../containers/ContainerMongoDB";
import {cart} from "../../models/mongoose/cart";
import {connectionString} from "../../configs/mongodb";
class CartDAOMongoDb extends ContainerMongoDB {
    constructor(){
        super(connectionString,cart);
    }
}

console.log(process.env.PORT);
export default CartDAOMongoDb