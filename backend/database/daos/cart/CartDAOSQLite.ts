import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../options/SQLite3"

class CartDAOSQLite extends ContainerKnexDB {
    constructor(){
        super('cart',options);
    }
}

export default CartDAOSQLite