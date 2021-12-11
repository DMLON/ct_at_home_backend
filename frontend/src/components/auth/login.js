import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import BackendController from "../../helpers/backendController";

// create login component
const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;

    const controller = BackendController.UserController;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Create an object of formData
        console.log(user);
        controller.loginUser(user)
            .then(res => {
                console.log(res);
                window.location = "/";
            })
            .catch(err => console.log(err));
        
    };


    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h1 className="text-center">Account Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input placeholder="Email" className="form-control" type="email" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input placeholder="Password" className="form-control" type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <input type="submit" value="Login" className="mt-3 btn btn-primary btn-block" />
                </form>
                <p className="my-1">
                    Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
