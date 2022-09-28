import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from 'axios';
import { Link } from "@reach/router";

export const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    function postData(e){
        e.preventDefault();

        const user = { email: email,
            password: password};
        console.log(user);
        axios.post('http://localhost:3000/login', user).then(data => {
            console.log(data);
            if (data.data.accessToken) {
                localStorage.setItem("token", data.data.accessToken);
                localStorage.setItem("role", data.data.role);
                navigate('/');
                window.location.reload(false);

            } else {
                console.log("Authentication error");
            }       
        })
        .catch(error => {
            console.log(error);
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
            <button onClick={postData} className="btn btn-primary">Submit</button>
            <hr />
            <div>
                <Link to={`/register`}>
                <p>Nemate racun? Registrirajte se ovdje </p>
                </Link> 
            </div>
        </form>
    </div>
    )
};
export default Login;