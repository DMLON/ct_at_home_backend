import ContainerFirebase from "../../containers/ContainerFirebase";

class CartDAOFirebase extends ContainerFirebase{
    constructor(){
        super("carts");
    }
}

export default CartDAOFirebase;