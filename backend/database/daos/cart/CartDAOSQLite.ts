import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/SQLite3"

class CartDAOSQLite extends ContainerKnexDB {
    constructor(){
        super('cart',options);
    }
}

export default CartDAOSQLite