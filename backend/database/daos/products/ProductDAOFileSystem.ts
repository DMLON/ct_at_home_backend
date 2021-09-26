import ContainerFileSystem from "../../containers/ContainerFileSystem";
import path from "path"
import Product from "../../models/FileSystem/productModel";



class ProductDAOFileSystem extends ContainerFileSystem<Product>{
    constructor(){
        const path_to_file = path.join(path.resolve(__dirname, '../..'),"databases","fs","products.json");
        super(Product,path_to_file);
    }
}

export default ProductDAOFileSystem;