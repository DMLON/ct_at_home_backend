import ProductDAOMemory from './ProductDAOMemory';

function createProduct(offset = null){
    const product = ({
        name: "ProductName"+(offset ? offset: ""),
        description: "ProductDescription"+(offset ? offset: ""),
        code: "ProductCode"+(offset ? offset: ""),
        photo: "ProductPhoto"+(offset ? offset: ""),
        price: 500,
        stock: 10
    });
    return product;
}
test('Create a new object', async () => {
    const db = new ProductDAOMemory(true);
    const product = createProduct();
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    await db.createObject(product);

    objects = await db.getAll();

    expect(objects.length).toBe(1);
});


test('Create a new object and delete by id', async () => {
    const db = new ProductDAOMemory(true);
    const cart = createProduct();

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
    
    const db = new ProductDAOMemory(true);
    

    // Check if there are no objects
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    const ids = []
    for(let i = 0 ; i < 5; i++){
        ids.push(await db.createObject(createProduct(i+1)));
    }

    objects = await db.getAll();
    expect(objects.length).toBe(5);

    await db.deleteAll();
    
    objects = await db.getAll();
    expect(objects.length).toBe(0);
});

test('Find object by id', async () => {
    
    const db = new ProductDAOMemory(true);
    

    // Check if there are no objects
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    const ids = []
    for(let i = 0 ; i < 5; i++){
        ids.push(await db.createObject(createProduct(i+1)));
    }

    objects = await db.getAll();
    expect(objects.length).toBe(5);

    
    let product = null;
    for(let i = 0 ; i < 5; i++){
        product = await db.findById(ids[i]);
        expect(product).not.toBeNull();
        expect(product.name).toBe("ProductName"+(i+1));
    }
});

test('Update object', async () => {
    
    const db = new ProductDAOMemory(true);
    

    // Check if there are no objects
    await db.deleteAll();
    let objects = await db.getAll();
    expect(objects.length).toBe(0);

    const ids = []
    for(let i = 0 ; i < 2; i++){
        ids.push(await db.createObject(createProduct(i+1)));
    }

    objects = await db.getAll();
    expect(objects.length).toBe(2);

    
    let product = null;
    for(let i = 0 ; i < 2; i++){
        product = await db.findById(ids[i]);
        expect(product).not.toBeNull();
        expect(product.name).toBe("ProductName"+(i+1));
    }

    // Test update for first object
    product = await db.findById(ids[0]);
    product.name = "pepe";
    await db.updateObject(ids[0],product);

    product = await db.findById(ids[0]);
    expect(product).not.toBeNull();
    expect(product.name).toBe("pepe");
    expect(product.description).toBe("ProductDescription1");


});