import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../options/mariaDB"

class CartDAOMariaDB extends ContainerKnexDB {
    constructor(){
        super('cart',options);
    }
}

export default CartDAOMariaDB