import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import ItemDetail from './itemDetail';
import "./itemDetailContainer.sass"
import BackendController from '../helpers/backendController';

const ItemDetailContainer = () => {
    const {itemId} = useParams();
    // Funcion para poder agarrar el json products que tiene toda la info de los productos
    // Imagenes de productos fueron obtenidas por medio de web scrapping google images
    const [item, setItem] = useState(null);
    const [error, setError] = useState(false);

    useEffect(async () => {
        const db = BackendController.ProductController;
        const dbItem = await db.getProduct(itemId);
        if(dbItem != null){
            setItem(dbItem);
        }
        else{
            setError(true);
        }
    },[])   

    return (
        <div className="itemDetailContainer">
            {
                error ? <h2>No se encontró el item</h2> : item && <ItemDetail item={item}/>
            }
        </div>
    )
}

export default ItemDetailContainer
