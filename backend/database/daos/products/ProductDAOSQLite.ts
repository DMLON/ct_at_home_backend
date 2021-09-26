import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../configs/SQLite3"

class ProductDAOSQLite extends ContainerKnexDB {
    constructor(){
        super('products',options);
    }
}

export default ProductDAOSQLite