import axios from "axios";
import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import BackendController from "../../helpers/backendController";
import { LoginContext } from "./loginContext";

//create signup component
const Signup = () => {
    // To redirect after sign in
    const history = useHistory();
    const loginContext = useContext(LoginContext);
    const [imageFile, setImageFile] = useState("");
    const [sucessUpload, setSucessUpload] = useState(null);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address:"", 
        country:"", 
        age:"", 
        phone:"",
        photo:""
    });
    const controller = BackendController.UserController;
    const { firstName, lastName, email, password, address, country, age, phone, photo } = user;
    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const onChangeImage = (e) => {setImageFile(e.target.files[0]); console.log(e.target.files[0]);};
    const uploadFile = (e) => {
        e.preventDefault();
        if(!imageFile || typeof imageFile === 'string'){
            console.log("Invalid file");
            return;
        }
        const formData = new FormData();
        
        // Update the formData object
        console.log(imageFile)
        formData.append(
            "file",
            imageFile,
            imageFile.name
        );
        console.log(formData);

        axios.post(BackendController.baseEndpoint+"/api/upload", formData)
            .then(res => { 
                setImageFile(BackendController.baseEndpoint+"/uploads/"+res.data.file.filename);
                setUser({ ...user, photo: res.data.file.filename });
                setSucessUpload(true);
            }).catch(err => {
                console.log(err);
                setSucessUpload(false);
            });

    }
    const onSubmit = (e) => {
        e.preventDefault();
        // Create an object of formData
        if(!sucessUpload){
            console.log("please upload a photo");
            return;
        }
        console.log(user);
        controller.signupUser(user)
            .then(res => {
                const frontUser = {...user};
                delete frontUser.password;
                loginContext.setUser(frontUser);
                history.push(`/`);
            })
            .catch(err => console.log(err));
        
    };

    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h1 className="text-center">Sign Up</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={onChange}
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={onChange}
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            className="form-control"
                            type="text"
                            name="address"
                            value={address}
                            onChange={onChange}
                            placeholder="Enter your address"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            className="form-control"
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            placeholder="Enter your phonen number"
                        />
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            className="form-control"
                            type="text"
                            name="country"
                            value={country}
                            onChange={onChange}
                            placeholder="Enter your country"
                        />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input
                            className="form-control"
                            type="number"
                            name="age"
                            value={age}
                            onChange={onChange}
                            placeholder="Enter your age"
                        />
                    </div>
                    <div className="form-group">
                        <label>Profile photo</label>
                        <input type="file" name="photo"  onChange={onChangeImage}/>
                        <button className="mt-0  btn btn-primary btn-block" onClick={uploadFile}>Upload</button>
                        {sucessUpload?<img src={imageFile} style={{width:"256px",height:"256px"}} alt="img"/>:<></>}
                        {sucessUpload == null? <></> : sucessUpload? <p className="text-success">File uploaded successfully</p>:<p className="text-danger">File upload failed</p>}
                    </div>
                    <p className="mt-2 mb-1">Already have an account? <NavLink to="/login" className="btn btn-link">Login</NavLink></p>

                    <button className="mt-0  btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
