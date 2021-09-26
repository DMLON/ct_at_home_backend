import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/mariaDB"

class ProductDAOMariaDB extends ContainerKnexDB {
    constructor(test = false){
        if(test)
            super('products_test',options);
        else
            super('products',options);
    }
}

export default ProductDAOMariaDB