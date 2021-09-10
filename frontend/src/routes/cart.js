import React, { useContext } from 'react';
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom';
import CartContent from '../components/cartContent';

const Cart = () => {
    const cartContext = useContext(CartContext)

    function renderItems(){
        return <div className="text-center mt-4 container">
            <CartContent enableEdit={true}/>
        <Link className="btn btn-success" to="/checkout">Finalizar Compra</Link>
        </div>
    }

    function renderNoItems(){
        return <>
        
        <div className="text-center">
            <p className="mt-4">No hay items!</p>
            <Link className="btn btn-success" to="/">Volver al catalogo</Link>
        </div>
        </>
    }
    return (
        <div>
            {cartContext.cart.length === 0? renderNoItems(): renderItems()}
        </div>
    )
}

export default Cart
