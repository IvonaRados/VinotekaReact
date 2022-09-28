import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import Modal from "./Modal";
import { Link } from "@reach/router";
import { Button } from "react-bootstrap";
import EditVino from "./EditVino";
import Login from "./Login";
//import { getProizvodacById } from "C:\Users\Ivona\Desktop\Seminarski- Vinoteka\controllers\GetProizvodaci.js";


const DetailsVina = ( props ) => {
    const [vino, setVino] = useState([]);
    const [proizvodac, setProizvodac] = useState([]);
    const [open, setOpen] = useState(false);
    const role = localStorage.getItem("role");

    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }}; 

    function getVino() {
        fetch(`http://localhost:3000/vina/${props.location.state.vino_id}`, options
                    ).then((value) => value.json().then((vino) => {setVino(vino)}))
            
    }
    
    useEffect(() => {
        getVino();
    }, []);
    
    function getProizvodac() {
        console.log(vino);
        const proizvodac = fetch(
            `http://localhost:3000/proizvodaci/${vino.proizvodaci}`, options
            ).then((value) => value.json().then((proizvodac) => {setProizvodac(proizvodac)}))
    }
    


    //console.log(vino.proizvodac)
    useEffect(() =>{
        
        if(vino.proizvodaci!=undefined){
            getProizvodac();
        }
    }, [vino.proizvodaci]);

    const openModal = () => {
        setOpen(true)
    };


    return(
        <div>
            {
                role ?
                <div>
                <h2>{vino.ime}</h2>
                <p>Cijena : {vino.cijena}</p>
                <p>Postotak alkohola: {vino.postotak}</p>
                <p>Vrsta: {vino.vrsta}</p>
                <p>Stil: {vino.stil}</p>
                <p>Opis: {vino.opis}</p>
                <p>Proizvođač: {proizvodac.ime}</p>
    
                <hr />
                <div>
                    <Link to={`/proizvodac/details/${proizvodac.ime}`} state={{ proizvodac_object: proizvodac }}>
                            <button type="button">{proizvodac.ime}</button>
                            <hr />
                    </Link> 
                </div>
    
                <div>
                    {
                        role==="Admin" ?   
                    <div>
                    <Link to={`/vino/edit/${vino.ime}`} state={{ vino_id: vino._id }}>
                            <button type="button">Edit</button>
                            <hr />
                    </Link> 
                    
                    
                        <button onClick={openModal}>Delete</button> 
                    </div>
                    : " " }
                    
                </div>
                <div>
                    <Modal open={open} obj={vino} vrsta={"vino"} handleClose={() => setOpen(false)} />
                </div> 
            </div>
                  : <Login/>}
        </div>
        
    )
};

export default DetailsVina;
