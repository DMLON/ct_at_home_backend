import ContainerFirebase from "../../containers/ContainerFirebase";

class ProductDAOFirebase extends ContainerFirebase{
    constructor(test = false){
        if(test)
            super("products_test");
        else 
            super("products");
    }
}

export default ProductDAOFirebase;