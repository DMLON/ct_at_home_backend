
import React, { useContext } from 'react';
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom';

const CartContent = ({enableEdit}) => {
    const cartContext = useContext(CartContext);

    function removeItem(itemId){
        cartContext.removeItem(itemId);
    }
    return (
        <>
        <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total Parcial</th>
                        {enableEdit?<th></th>: <></>}
                    </tr>
                    
                </thead>
                <tbody>
                    {cartContext.cart.map(itemQuantity =>(
                    <tr>
                        <td><img style={{width: "100px", height:"100px"}} src={itemQuantity.product.photo}></img></td>
                        <td>{itemQuantity.product.name}</td>
                        <td>${itemQuantity.product.price}</td>
                        <td>{itemQuantity.quantity}</td>
                        <td>${itemQuantity.quantity * itemQuantity.product.price}</td>
                        {enableEdit?<td>
                            <button className="btn btn-danger mx-1" onClick={()=>removeItem(itemQuantity.product._id)}>X</button>
                            <Link className="btn btn-success mx-1" to={"/item/"+itemQuantity.product._id}>Editar</Link>
                        </td>: <></>}
                        
                    </tr>
                    ))}
                </tbody>
            </table>
        <p>Total: ${cartContext.getTotalPrice()}</p>
        </>
    )
}

export default CartContent
