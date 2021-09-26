
import ContainerMongoDB from "../../containers/ContainerMongoDB";
import {cart} from "../../models/mongoose/cart"
class CartDAOMongoDb extends ContainerMongoDB {
    constructor(){
        super("mongodb+srv://dbUser:<password>@cluster0.tkmat.mongodb.net/ecommerce?retryWrites=true&w=majority",cart);
    }
}

export default CartDAOMongoDb