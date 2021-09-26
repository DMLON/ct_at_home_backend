import ContainerFileSystem from "../../containers/ContainerFileSystem";
import Cart from "../../models/FileSystem/cartModel";
import path from "path"



class CartDAOFileSystem extends ContainerFileSystem<Cart>{
    constructor(test = false){
        let path_to_file = "";
        if(test)
            path_to_file = path.join(path.resolve(__dirname, '../..'),"databases","fs","test","cart.json");
        else
            path_to_file = path.join(path.resolve(__dirname, '../..'),"databases","fs","cart.json");
        super(Cart,path_to_file);
    }
}

export default CartDAOFileSystem;