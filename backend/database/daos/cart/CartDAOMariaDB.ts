import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/mariaDB"

class CartDAOMariaDB extends ContainerKnexDB {
    constructor(){
        super('cart',options);
    }
}

export default CartDAOMariaDB