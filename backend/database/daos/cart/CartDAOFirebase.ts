import ContainerFirebase from "../../containers/ContainerFirebase";

class CartDAOFirebase extends ContainerFirebase{
    constructor(test = false){
        if(test)
            super("carts_test");
        else 
            super("carts");
    }
}

export default CartDAOFirebase;