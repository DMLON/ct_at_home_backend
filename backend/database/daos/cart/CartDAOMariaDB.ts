import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/mariaDB"

class CartDAOMariaDB extends ContainerKnexDB {
    constructor(test = false){
        if(test)
            super('cart_test',options);
        else
            super('cart',options);
    }
}

export default CartDAOMariaDB