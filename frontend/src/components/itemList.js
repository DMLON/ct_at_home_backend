import React, {useEffect, useState} from "react";
import Item from "./item";
import BackendController from "../helpers/backendController";

const ItemList = () => {
    
    // Funcion para poder agarrar el json products que tiene toda la info de los productos
    // Imagenes de productos fueron obtenidas por medio de web scrapping google images
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    //Hago que agarre la data del products.json al iniciar el componente
    async function fetchItems(){
        const db = BackendController.ProductController;
        const dbItem = await db.getAllProducts();
        if(dbItem != null){
            setData(dbItem);
        }
        else{
            setError(true);
        }
        setLoading(false);
    }
    useEffect(async () => {
        await fetchItems();
    }, []);

    return (<>
            {loading?<h2>Loading items...</h2>:data && data.length == 0?<h2>No items</h2>:<></>}
            {
                data && 
                data.length > 0 && 
                data
                .map((product) =>
                    <Item key={product.id} item={product}></Item>
                )
            }
        </>
    );
};

export default ItemList;

