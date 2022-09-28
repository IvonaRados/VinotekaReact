import React, { useState } from "react";
import {navigate} from "@reach/router";
import axios from 'axios';

const Register = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    
    function postData(e){
        e.preventDefault();
        if (password !== password2) {
            console.log("Passwords do not match");
            return;
        }

        const user = { email: email,
            password: password,
            role: "User" };

        axios.post('http://localhost:3000/register', user).then(response => {
            navigate('/login');        
        })
        .catch(error => {
            console.log(err);
        });

    }

    return(
    <div>
    <form>
        <div class="form-group">
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group">
            <input type="password" className="form-control" id="password" placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div class="form-group">
            <input type="password" className="form-control" id="password2" placeholder="Repeat password" 
                onChange={(e) => setPassword2(e.target.value)}/>
        </div>
        <button onClick={postData} className="btn btn-primary">Submit</button>
    </form>
    </div>
    )
};
export default Register;