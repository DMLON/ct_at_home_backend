const express = require('express');
const container = require('./container');

/**
 * Returns a number generated randomly between 0 and max - 1
 * @param {Number} max 
 * @returns Number between 0 and max - 1
 */
function generateRandomInteger(max) { 
    return Math.floor(Math.random() * max) % max;
}


const app = express();
const db = new container.Container('./products.json');
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`HTTP Server listening on port ${server.address().port}`);
})

app.get('/',async (req,res)=>{
    res.send(JSON.stringify({status:'database ok'}));
});

app.get('/productos',async (req,res)=>{
    products = await db.getAll();
    res.send(products);
});

app.get('/productoRandom',async (req,res)=>{
    products = await db.getAll();
    randomIdx = generateRandomInteger(products.length);
    res.send(products[randomIdx]);
});

