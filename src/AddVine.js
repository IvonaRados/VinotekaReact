import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddVine() {
    const [ime, setIme] = useState('');
    const [cijena, setCijena] = useState('');
    const [postotak, setPostotak] = useState('');
    const [vrsta, setVrsta] = useState('');
    const [stil, setStil] = useState('');
    const [opis, setOpis] = useState('');
    const [proizvodac_id, setProizvodac_id] = useState('');
    const [proizvodaci, setProizvodaci] = useState([]);



    function getProizvodaci(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const response = fetch(
        'http://localhost:3000/proizvodaci', options
        ).then((value) => value.json().then((proizvodaci) => {setProizvodaci(proizvodaci)}))
    }

    useEffect(() =>{
        getProizvodaci();
    }, []);

    function postData(){
        const vino = { ime: ime, cijena: cijena, postotak:postotak, vrsta:vrsta, stil:stil, opis: opis, proizvodaci: proizvodac_id };
        axios.post(`http://localhost:3000/vino/addVino`, vino);
    
    }
    return (
        <form>
            <div className="form-group">
                <input className="form-control" id="ime" placeholder='Ime' onChange={(e) => setIme(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="cijena" placeholder="Cijena" onChange={(e) => setCijena(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="postotak" placeholder='Postotak' onChange={(e) => setPostotak(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="vrsta" placeholder='Vrsta' onChange={(e) => setVrsta(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="stil" placeholder='Stil' onChange={(e) => setStil(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="opis" placeholder='Opis' onChange={(e) => setOpis(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="exampleFormControlSelect1">All</label>
                <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setProizvodac_id(e.target.value)}>
                <option>All</option>
                    {proizvodaci.map((item) => (
                        <option key={item._id} value={item._id}>{item.ime}</option>
                    ))}
                </select>
            </div>
            
            <button onClick={postData} className="btn btn-primary">Submit</button>
        </form>
        
        
    )
}