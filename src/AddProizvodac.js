import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddProizvodac() {
    const [ime, setIme] = useState('');
    const [godina_osnivanja, setGodina] = useState('');
    const [drzava, setDrzava] = useState('');
    const [opis, setOpis] = useState('');


    const postData = () => {
        console.log(ime, godina_osnivanja, drzava, opis);
        const proizvodac = { ime: ime, godina_osnivanja: godina_osnivanja, drzava:drzava, opis: opis };
        axios.post(`http://localhost:3000/proizvodaci/addProizvodac`, proizvodac);
    }
    return (
        <form>
            <div className="form-group">
                <input className="form-control" id="ime" placeholder='Ime' onChange={(e) => setIme(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="godina" placeholder="Godina osnivanja" onChange={(e) => setGodina(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="drzava" placeholder='Drzava' onChange={(e) => setDrzava(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="opis" placeholder='Opis' onChange={(e) => setOpis(e.target.value)} />
            </div>
            
            <button onClick={postData} type="submit" className="btn btn-primary">Submit</button>

        </form>
        
        
    )
}