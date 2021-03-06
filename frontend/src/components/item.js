import React, { useState, useContext} from "react";
import ItemCount from "./itemCount";
import './item.sass'
import { NavLink } from "react-router-dom";
import { CartContext } from "./cartContext";


const Item = ({item}) => {
    const cartContext = useContext(CartContext)
    const [addedQuantity, setAddedQuantity] = useState(0);
    const onAdd = (cantidad)=>{
        setAddedQuantity(cantidad);
        cartContext.addItem(item,cantidad);
    }
    
    return (
            <div className="product card">
                <NavLink className="product-link" to={`/item/${item._id}`}>
                    <img className="card-img-top product-img" alt={item.name} src={`${item.photo}`}></img>
                </NavLink>
                <div className="card-body w-100">
                    <NavLink className="product-link" to={`/item/${item._id}`}>
                        <h3 className="card-title">{item.name}</h3>
                        <h5>${item.price}</h5> 
                    </NavLink>

                    {(item.stock <= 0) ? <h5 className="text-red">Sin stock</h5> : <></>}
                    <p className="card-text"></p>
                    <ItemCount stock={item.stock} initial={1} onAdd={onAdd}></ItemCount>
                </div>
            </div>
        
    );
};
export default Item;