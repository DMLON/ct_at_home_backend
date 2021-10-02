import express,{Router} from 'express';

const router_cart = Router();

// Return all objects from a selected cart
router_cart.get('/:id/products', async (req,res)=>{

});

// Push items into a selected cart
router_cart.post('/:id/products', async (req,res)=>{

});

// Delete a selected product from a selected cart
router_cart.delete('/:id/products/:id_prod', async (req,res)=>{
    const {productId,quantity} = req.body;
});


// Create new cart and return id
router_cart.post('/', async (req,res)=>{

});

// Delete a cart
router_cart.delete('/:id', async (req,res)=>{

})




export default router_cart;