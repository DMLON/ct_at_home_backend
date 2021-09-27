import CartDAOMongoDB from './CartDAOMongoDB';


function createCart(offset = null){
    const products = [({
        product:({
            name: "ProductName"+(offset ? offset: ""),
            description: "ProductDescription"+(offset ? offset: ""),
            code: "ProductCode"+(offset ? offset: ""),
            photo: "ProductPhoto"+(offset ? offset: ""),
            price: 500,
            stock: 10
        }),
        quantity:1
    })]
    const cart ={ timestamp: new Date(), products:products };
    return cart;
}
test('Create a new object', async () => {
    const db = new CartDAOMongoDB(true);
    const product = createCart();
    try{
        const res = await db.createObject(product);
        expect(res).not.toBeNull();
    }
    catch(err){
        expect(err).toBeNull();
    }

},100000);