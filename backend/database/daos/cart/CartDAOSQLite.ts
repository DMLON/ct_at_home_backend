import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/SQLite3"

class CartDAOSQLite extends ContainerKnexDB {
    constructor(test = false){
        if (test)
            super('carts_test',options);
        else
            super('carts',options);
    }
}

export default CartDAOSQLite