import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Login from "./Login";


const Proizvodaci = () => {
    const role = localStorage.getItem("role");
    console.log(role);
    const [proizvodaci, setProizvodaci] = useState([]);
    //const [vino, setVino] = useState([]);


    function getProizvodaci() {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };
        const response = fetch(
            'http://localhost:3000/proizvodaci', options
        ).then((value) => value.json().then((proizvodaci) => { setProizvodaci(proizvodaci) }))
    }


    useEffect(() => {
        getProizvodaci();
    }, []);


    return (
        <form>
            <div>
                {
                    role ?
                        <div>
                            {proizvodaci.map((item) => (
                                <div key={item._id}>
                                    <h2>{item.ime}</h2>

                                    <Link to={`/proizvodac/details/${item.ime}`} state={{ proizvodac_object: item }}>
                                        <button type="button">Details Proizvodac</button>
                                        <hr />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        : <Login/>}
            </div>

        </form>
    )

}

export default Proizvodaci