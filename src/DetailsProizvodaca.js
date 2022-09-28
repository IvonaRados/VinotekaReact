import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import Modal from "./Modal";
import ModalForbidden from "./ModalForbidden";
import { Link } from "@reach/router";
import { Button } from "react-bootstrap";
import Login from "./Login";


const DetailsProizvodaca = (props) => {
    const [proizvodac, setProizvodac] = useState([]);
    const [vina, setVina] = useState([]);
    const [open, setOpen] = useState(false);
    const [openForbidden, setOpenFordbidden] = useState(false);
    const role = localStorage.getItem("role");
    console.log(role);


    function getProizvodac() {
        setProizvodac(props.location.state.proizvodac_object);
    }

    useEffect(() => {
        getProizvodac();
    }, []);


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

    useEffect(() => {
        getVina();
    }, []);

    const exsist = () => {
        number = 0
        for (let i = 0; i < vina.length; i++) {
            if (vina[i].proizvodaci == proizvodac._id) {
                setOpenFordbidden(true)
                return
            }
        }
        setOpen(true)
        return
    };


    return (
        <div>
            {
                role ?
                    <div>
                        <h2>{proizvodac.ime}</h2>
                        <p>Godina osnivanja : {proizvodac.godina_osnivanja}</p>
                        <p>Država: {proizvodac.drzava}</p>
                        <p>Opis: {proizvodac.opis}</p>

                        <hr />


                        <div>
                            <Link to={`/proizvodaci`}>
                                <button type="button">Pogledaj listu svih proizvodaca</button>
                                <hr />
                            </Link>

                            <div>
                                {
                                    role === "Admin" ?
                                        <div>
                                            <Link to={`/proizvodac/edit/${proizvodac.ime}`} state={{ id: proizvodac._id }}>
                                                <button type="button">Edit</button>
                                                <hr />
                                            </Link>

                                            <button onClick={exsist}>Delete</button>
                                        </div>
                                        : " "}
                                <div>
                                    <Modal open={open} obj={proizvodac} vrsta={"proizvodac"} handleClose={() => setOpen(false)} />
                                    <ModalForbidden open={openForbidden} obj={proizvodac} handleClose={() => setOpenFordbidden(false)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Login />}
        </div>

    )
};

export default DetailsProizvodaca;
