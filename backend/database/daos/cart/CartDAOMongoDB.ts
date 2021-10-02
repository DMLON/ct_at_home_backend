
import ContainerMongoDB from "../../containers/ContainerMongoDB";
import {cartModel} from "../../../src/models/cart.model";
import {connectionString, connectionStringTest} from "../../configs/mongodb";
class CartDAOMongoDb extends ContainerMongoDB {
    constructor(test = false){
        if(test)
            super(connectionStringTest,cartModel);
        else
            super(connectionString,cartModel);
        
    }
}
export default CartDAOMongoDb