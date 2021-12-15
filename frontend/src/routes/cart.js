import React, { useContext } from 'react';
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom';
import CartContent from '../components/cartContent';
import BackendController from '../helpers/backendController';
import { useHistory } from 'react-router-dom';

const Cart = () => {
    const cartContext = useContext(CartContext)
    const controller = BackendController.CartController;
    const history = useHistory();
    function buyCart(){
        debugger;
        controller.buyCart(cartContext.cartId)
        .then(res => {
            console.log(res);
            history.push("/");
        }).catch(err => {
            console.log(err);
        });

    }
    function renderItems(){
        return <div className="text-center mt-4 container">
            <CartContent enableEdit={true}/>
        <button className="btn btn-success" onClick={buyCart}>Finalizar Compra</button>
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
