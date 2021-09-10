import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from './components/navbar'
import './App.sass';
import ItemListContainer from "./components/itemListContainer"
import ItemDetailContainer from "./components/itemDetailContainer";
import Cart from "./routes/cart"
import { CartProvider } from "./components/cartContext";


// ["Catalogo", "Cotizador", "Contacto", "Acerca de", "Log In"];

function App() {
    return (
      <CartProvider>
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route exact path="/cart">
                    <Cart/>
                </Route>
                <Route exact path="/item/:itemId">
                    <ItemDetailContainer/>
                </Route>
                <Route path="/">
                    <ItemListContainer/>
                </Route>
            </Switch>
        </BrowserRouter>
      </CartProvider>
    );
    
}

export default App;