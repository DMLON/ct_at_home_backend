import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/mariaDB"

class CartDAOMariaDB extends ContainerKnexDB {
    constructor(test = false){
        if(test)
            super('carts_test',options);
        else
            super('carts',options);
    }
}

export default CartDAOMariaDB