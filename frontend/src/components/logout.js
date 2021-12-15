

import React from 'react'
import BackendController from '../helpers/backendController'

const Logout = ({category}) => {

    const controller = BackendController.UserController

    function logout(){
        controller.logoutUser()
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    
    }

    return (
        <li key={category.name} className={"nav-item"}>
            <a className={"nav-link active"} onClick={logout}>
                {category.name}
            </a>
        </li>
    )
}

export default Logout
