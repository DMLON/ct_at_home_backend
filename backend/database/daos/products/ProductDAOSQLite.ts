import ContainerKnexDB from "../../containers/ContainerKnexDB";
import {options} from "../../options/SQLite3"

class ProductDAOSQLite extends ContainerKnexDB {
    constructor(){
        super('products',options);
    }
}

export default ProductDAOSQLite