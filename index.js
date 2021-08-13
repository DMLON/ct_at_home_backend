const express = require('express');
const { router_products } = require('./routers/productos');
var methodOverride = require("method-override");



/**
 * Returns a number generated randomly between 0 and max - 1
 * @param {Number} max 
 * @returns Number between 0 and max - 1
 */
function generateRandomInteger(max) { 
    return Math.floor(Math.random() * max) % max;
}


const app = express();
app.use(methodOverride("_method"))
// Use Json
app.use(express.json());
// Use url encoding on extended mode
app.use(express.urlencoded({extended: true}));
// Set api/products router
app.use('/api/products',router_products)

app.use("/public",express.static('public'));

// HTML5 only supports GET and POSt, need to use method override to add PUT and DELETE


const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`HTTP Server listening on port ${server.address().port}`);
})

app.get('/',async (req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

