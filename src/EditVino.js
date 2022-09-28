import React from "react";
import { useState, useEffect, useContext } from "react";
//import { getProizvodacById } from "C:\Users\Ivona\Desktop\Seminarski- Vinoteka\controllers\GetProizvodaci.js";
import axios from 'axios';
import { History } from "react-router-dom";
import { Link } from "@reach/router";


const EditVino = ( props ) => {
    const [vino, setVino] = useState([]);
    const [proizvodac, setProizvodac] = useState([]);
    const [proizvodaci, setProizvodaci] = useState([]);
    const [id, setID] = useState('');

    const [ime, setIme] = useState('');
    const [cijena, setCijena] = useState('');
    const [postotak, setPostotak] = useState('');
    const [vrsta, setVrsta] = useState('');
    const [stil, setStil] = useState('');
    const [opis, setOpis] = useState('');

    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }};

    function getVino() {
        fetch(`http://localhost:3000/vina/${props.location.state.vino_id}`, options
                ).then((value) => value.json().then((vino) => {setVino(vino)}))
        
    }

    useEffect(() => {
        if (props.location.state.vino_id != ''){
            getVino();
        }
    }, [props.location.state.vino_id]);

    function getProizvodaci(){
        const response = fetch(
        'http://localhost:3000/proizvodaci', options
        ).then((value) => value.json().then((proizvodaci) => {setProizvodaci(proizvodaci)}))
    }

    useEffect(() =>{
        getProizvodaci();
    }, []);

    
    function getProizvodac() {
        const proizvodac = fetch(
            `http://localhost:3000/proizvodaci/${vino.proizvodaci}`, options
            ).then((value) => value.json().then((proizvodac) => {setProizvodac(proizvodac)}))
    }


    useEffect(() =>{
        if(vino.proizvodaci!=''){
            getProizvodac();
        }
    }, [vino.proizvodaci]);


    function postData () {
        const obj = {}
        if(ime!=''){
            obj.ime = ime;
        }
        else{
            obj.ime = vino.ime;
        }
        if(cijena!=''){
            obj.cijena = cijena;
        }
        else{
            obj.cijena = vino.cijena;
        }
        if(postotak!=''){
            obj.postotak = postotak;
        }
        else{
            obj.postotak = vino.postotak;
        }
        if(vrsta!=''){
            obj.vrsta = vrsta;
        }
        else{
            obj.vrsta = vino.vrsta;
        }
        if(stil!=''){
            obj.stil = stil;
        }
        else{
            obj.stil = vino.stil;
        }
        if(opis!=''){
            obj.opis = opis;
        }
        else{
            obj.opis = vino.opis;
        }
        if(proizvodac!=''){
            obj.proizvodaci = id;
        }
        else{
            obj.proizvodaci = id;
        }

        axios.put(`http://localhost:3000/vino/editVino/${vino._id}`, obj)
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
                <input className="form-control" id="ime" defaultValue={vino.ime} onChange={(e) => setIme(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="cijena" defaultValue={vino.cijena} onChange={(e) => setCijena(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="postotak" defaultValue={vino.postotak} onChange={(e) => setPostotak(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="vrsta" defaultValue={vino.vrsta} onChange={(e) => setVrsta(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="stil" defaultValue={vino.stil} onChange={(e) => setStil(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="opis" defaultValue={vino.opis} onChange={(e) => setOpis(e.target.value)} />
            </div>
            
            <div>
                <select className="custom-select" onChange={(e) => setID(e.target.value)}>
                    <option>All</option>
                    {proizvodaci.map((item) => (
                        <option key={item._id} value={item._id}>{item.ime}</option>
                    ))}
                </select>
            </div>
            <Link to={`/`}>
                <button onClick={postData} className="btn btn-primary">Submit</button>
            </Link>
           
        </form>
        
        
    )
};

export default EditVino;
