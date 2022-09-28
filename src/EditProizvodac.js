import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link } from "@reach/router";


const EditProizvodac = ( props ) => {
    const [ime, setIme] = useState('');
    const [godina_osnivanja, setGodina] = useState('');
    const [drzava, setDrzava] = useState('');
    const [opis, setOpis] = useState('');

    const [proizvodac, setProizvodac] = useState([]);
    const [id, setID] = useState('');


    function getProizvodac() {
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const proizvodac = fetch(
            `http://localhost:3000/proizvodaci/${props.location.state.id}`, options
            ).then((value) => value.json().then((proizvodac) => {setProizvodac(proizvodac)}))
    }

    useEffect(() =>{
        if(props.location.state.id!=''){
            getProizvodac();
        }
    }, [props.location.state.id]);



    function postData () {
        const obj = {}
        if(ime!=''){
            obj.ime = ime;
        }
        else{
            obj.ime = proizvodac.ime;
        }
        if(godina_osnivanja!=''){
            obj.godina_osnivanja = godina_osnivanja;
        }
        else{
            obj.godina_osnivanja = proizvodac.godina_osnivanja;
        }
        if(drzava!=''){
            obj.drzava = drzava;
        }
        else{
            obj.drzava = proizvodac.drzava;
        }
        if(opis!=''){
            obj.opis = opis;
        }
        else{
            obj.opis = proizvodac.opis;
        }

        axios.put(`http://localhost:3000/proizvodac/editproizvodac/${proizvodac._id}`, obj)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(err);
            });
    }

    return (

        <form>
            <div className="form-group">
                <input className="form-control" id="ime" defaultValue={proizvodac.ime} onChange={(e) => setIme(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="godina" defaultValue={proizvodac.godina_osnivanja} onChange={(e) => setGodina(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="drzava" defaultValue={proizvodac.drzava} onChange={(e) => setDrzava(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="opis" defaultValue={proizvodac.opis} onChange={(e) => setOpis(e.target.value)} />
            </div>
            <Link to={`/`}>
                <button onClick={postData} className="btn btn-primary">Submit</button>
            </Link>
        </form>
        
    )
};

export default EditProizvodac;
