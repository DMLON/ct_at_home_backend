import ContainerFileSystem from "../../containers/ContainerFileSystem";
import path from "path"
import Product from "../../models/FileSystem/productModel";



class ProductDAOFileSystem extends ContainerFileSystem<Product>{
    constructor(test = false){
        let path_to_file = "";
        if(test)
            path_to_file = path.join(path.resolve(__dirname, '../..'),"databases","fs","test","products.json");
        else
            path_to_file = path.join(path.resolve(__dirname, '../..'),"databases","fs","products.json");
        super(Product,path_to_file);
    }
}

export default ProductDAOFileSystem;