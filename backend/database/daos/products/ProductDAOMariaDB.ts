import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../options/mariaDB"

class ProductDAOMariaDB extends ContainerKnexDB {
    constructor(){
        super('products',options);
    }
}

export default ProductDAOMariaDB