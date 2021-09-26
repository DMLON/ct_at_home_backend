import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/SQLite3"

class CartDAOSQLite extends ContainerKnexDB {
    constructor(test = false){
        if (test)
            super('cart_test',options);
        else
            super('cart',options);
    }
}

export default CartDAOSQLite