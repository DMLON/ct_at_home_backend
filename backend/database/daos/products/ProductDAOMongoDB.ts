
import ContainerMongoDB from "../../containers/ContainerMongoDB";
import {product} from "../../models/mongoose/product"
import {connectionString,connectionStringTest} from "../../configs/mongodb";

class ProductDAOMongoDb extends ContainerMongoDB {
    constructor(test = false){
        if(test)
            super(connectionStringTest,product);
        else
            super(connectionString,product);
        
    }
}

export default ProductDAOMongoDb