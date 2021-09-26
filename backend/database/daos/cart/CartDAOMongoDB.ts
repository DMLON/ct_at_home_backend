
import ContainerMongoDB from "../../containers/ContainerMongoDB";
import {cart} from "../../models/mongoose/cart";
import {connectionString,connectionStringTest} from "../../configs/mongodb";
class CartDAOMongoDb extends ContainerMongoDB {
    constructor(test = false){
        if(test)
            super(connectionStringTest,cart);
        else
            super(connectionString,cart);
        
    }
}

console.log(process.env.PORT);
export default CartDAOMongoDb