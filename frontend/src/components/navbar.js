import React, { useContext } from "react";
import "./navbar.sass";
import CartWidget from "./cartWidget";
import { Link, NavLink } from "react-router-dom";

import { CartContext } from "./cartContext";
import { LoginContext } from "./auth/loginContext";
import Logout from "./logout";

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

    const loginContext = useContext(LoginContext);



    function renderCategory(category) {
        const category_internal = {...category};
        if(category.name == "Login"){
            if(loginContext.user){
                category_internal.link = "/logout";
                category_internal.name = "Logout";

                return (
                    <Logout category={category_internal}></Logout>
                );

            }            
        }
        return (
            <li key={category_internal.name} className={"nav-item"}>
                <NavLink exact activeClassName="selected-link" className={"nav-link active"} to={category_internal.link} aria-current={"page"}>
                    {category_internal.name}
                </NavLink>
            </li>
        );
    }

    function renderUser(){
        if(loginContext.user){
            return (
                <li className={"nav-item"}>
                    Hello {loginContext.user.firstName}
                </li>
            );
        }
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
                    {renderUser()}
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
