import ContainerFirebase from "../../containers/ContainerFirebase";

class ProductDAOFirebase extends ContainerFirebase{
    constructor(){
        super("products");
    }
}

export default ProductDAOFirebase;