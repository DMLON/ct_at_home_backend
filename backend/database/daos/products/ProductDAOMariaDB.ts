import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/mariaDB"

class ProductDAOMariaDB extends ContainerKnexDB {
    constructor(){
        super('products',options);
    }
}

export default ProductDAOMariaDB