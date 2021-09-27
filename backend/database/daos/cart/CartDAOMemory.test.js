import CartDAOMemory from './CartDAOMemory';

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
    const db = new CartDAOMemory(true);
    const product = createCart();
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    await db.createObject(product);

    objects = await db.getAll();

    expect(objects.length).toBe(1);
});


test('Create a new object and delete by id', async () => {
    const db = new CartDAOMemory(true);
    const cart = createCart();

    // Check if there are no objects
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    const id = await db.createObject(cart);

    objects = await db.getAll();
    expect(objects.length).toBe(1);

    await db.deleteById(id);

    objects = await db.getAll();
    expect(objects.length).toBe(0);
});


test('Create a many objects and delete all', async () => {
    
    const db = new CartDAOMemory(true);
    

    // Check if there are no objects
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    const ids = []
    for(let i = 0 ; i < 5; i++){
        ids.push(await db.createObject(createCart(i+1)));
    }

    objects = await db.getAll();
    expect(objects.length).toBe(5);

    await db.deleteAll();
    
    objects = await db.getAll();
    expect(objects.length).toBe(0);
});

test('Find object by id', async () => {
    
    const db = new CartDAOMemory(true);
    

    // Check if there are no objects
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    const ids = []
    for(let i = 0 ; i < 5; i++){
        ids.push(await db.createObject(createCart(i+1)));
    }

    objects = await db.getAll();
    expect(objects.length).toBe(5);

    
    let cart = null;
    for(let i = 0 ; i < 5; i++){
        cart = await db.findById(ids[i]);
        expect(cart).not.toBeNull();
        expect(cart.products[0].product.name).toBe("ProductName"+(i+1));
    }
});


test('Update object', async () => {
    
    const db = new CartDAOMemory(true);
    

    // Check if there are no objects
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    const ids = []
    for(let i = 0 ; i < 5; i++){
        ids.push(await db.createObject(createCart(i+1)));
    }

    objects = await db.getAll();
    expect(objects.length).toBe(5);

    
    let cart = null;
    for(let i = 0 ; i < 5; i++){
        cart = await db.findById(ids[i]);
        expect(cart).not.toBeNull();
        expect(cart.products[0].product.name).toBe("ProductName"+(i+1));
    }

    // Test update for first object
    cart = await db.findById(ids[0]);
    cart.products[0].product.price = 20;
    await db.updateObject(ids[0],cart);

    cart = await db.findById(ids[0]);
    expect(cart).not.toBeNull();
    expect(cart.products[0].product.price).toBe(20);
    expect(cart.products[0].product.description).toBe("ProductDescription1");


});