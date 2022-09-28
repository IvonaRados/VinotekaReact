import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Login from "./Login";


const SearchParams = () => {
    const [vina, setVina] = useState([]);
    //const [vino, setVino] = useState([]);
    const [proizvodaci, setProizvodaci] = useState([]);
    const role = localStorage.getItem("role");
    console.log(role);

    function getVina() {
        const options = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };
        const response = fetch(
            'http://localhost:3000/vina', options
        ).then((value) => value.json().then((vina) => { setVina(vina) }))

    }

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




    useEffect(() => {

        getVina();
    }, []);

    //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
    const sorted = proizvodaci.sort((a, b) => (a.ime > b.ime) ? 1 : -1);
    console.log(proizvodaci);

    /* useEffect(() => {
         if (genre != ''){
         getSubgenre();
         }
     }, [genre]);
 
     useEffect(() => {
         if(subgenre!='') {
         getSongs();
         }
     }, [subgenre])*/


    return (
        <form>
            <div>
                {
                    role ?
                        <div>
                            {proizvodaci.map((item) => (
                                <div key={item._id}>

                                    <div>
                                        {vina.map((itemV) => (
                                            <div key={itemV._id}>
                                                {
                                                    itemV.proizvodaci === item._id ?
                                                        <div>
                                                            <option>{itemV.ime}</option>
                                                            <option>Proizvodac: {item.ime}</option>
                                                            <Link to={`/vino/details/${itemV.ime}`} state={{ vino_id: itemV._id }}>
                                                                <button type="button">Details Vina</button>
                                                                <hr />
                                                            </Link>
                                                        </div>
                                                        : " "
                                                }


                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        : <Login />
                }
            </div>

        </form>
    )

}

export default SearchParams