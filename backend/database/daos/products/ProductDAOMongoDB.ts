
import ContainerMongoDB from "../../containers/ContainerMongoDB";
import {product} from "../../models/mongoose/product"
class ProductDAOMongoDb extends ContainerMongoDB {
    constructor(){
        super("mongodb+srv://dbUser:<password>@cluster0.tkmat.mongodb.net/ecommerce?retryWrites=true&w=majority",product);
    }
}

export default ProductDAOMongoDb