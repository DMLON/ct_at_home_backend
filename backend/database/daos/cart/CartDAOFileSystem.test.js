import Cart from '../../models/FileSystem/cartModel';
import Product from '../../models/FileSystem/productModel';
import ProductQuantity from '../../models/FileSystem/productQuantity';
import CartDAOFileSystem from './CartDAOFileSystem';

test('Create a new cart Fi', async () => {
    const db = new CartDAOFileSystem();
    const products = [new ProductQuantity({
        Product:new Product({
            name: "ProductName",
            description: "ProductDescription",
            code: "ProductCode",
            photo: "ProductPhoto",
            price: 500,
            stock: 10
        }),
        quantity:1
    })]
    const cart = new Cart(-1,products)
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    db.createObject(cart);

    objects = await db.getAll();
    expect(objects.length).toBe(1);

    
});