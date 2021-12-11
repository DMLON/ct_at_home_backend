import React, { useContext } from "react";
import "./navbar.sass";
import CartWidget from "./cartWidget";
import { Link, NavLink } from "react-router-dom";

import { CartContext } from "./cartContext";

const categories = [
    {name:"Catalogo",link:"/"},
    {name:"Login",link:"/login"}];

function NavBarToggler(props) {
    return (
        <div>
            <button
                className={"navbar-toggler"}
                type={"button"}
                data-bs-toggle={"collapse"}
                data-bs-target={`#${props.target}`}
                aria-controls={props.target}
                aria-expanded={"false"}
                aria-label={"Toggle navigation"}
            >
                <span className={"navbar-toggler-icon"}></span>
            </button>
        </div>
    );
}

function NavBar() {
    const cartContext = useContext(CartContext)

    function renderCategory(category) {
        return (
            <li key={category.name} className={"nav-item"}>
                <NavLink exact activeClassName="selected-link" className={"nav-link active"} to={category.link} aria-current={"page"}>
                    {category.name}
                </NavLink>
            </li>
        );
    }
    return (
        <nav className={"navbar navbar-expand-lg navbar-light bg-soft-yellow"}>
            <div className={"container-fluid"}>
                <Link to="/" className={"navbar-brand"}>CT@Home</Link>
                <NavBarToggler target={"navbarToggler"}/>
                <div className={"collapse navbar-collapse"} id={"navbarToggler"}>
                    <ul className={"navbar-nav me-auto mb-2 mb-lg-0"}>
                        {categories.map((category) => renderCategory(category))}
                    </ul>
                    {cartContext.cart.length > 0?
                    <NavLink className="nav-link-custom" exact activeClassName="selected-link" to="/cart">
                        <CartWidget />
                    </NavLink>
                    : <></>
                    }
                </div>
                {/* https://codepen.io/thalesmelo/pen/LRYwQo */}
            </div>
        </nav>
    );

}

export default NavBar;
