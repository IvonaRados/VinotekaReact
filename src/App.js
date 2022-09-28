import ReactDOM from "react-dom";
import React from "react";
import SearchParams from "./SearchParams";
import DetailsVina from "./DetailsVina";
import Proizvodaci from "./Proizvodaci";
import AddVine from "./AddVine";
import AddProizvodac from "./AddProizvodac";
import EditVino from "./EditVino";
import EditProizvodac from "./EditProizvodac";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { Provider } from "./Context";
import { Router, Link } from "@reach/router";
import DetailsProizvodaca from "./DetailsProizvodaca";
import "./style.css";

import 'bootstrap/dist/css/bootstrap.min.css';


//'https://demo5823031.mockable.io/genres'
//`https://demo5823031.mockable.io/genre/${gen}`
//`https://demo5823031.mockable.io/genre/subgerne/${subgen}`
//<DetailsProizvidaci path="/details/:proizvodac" />

const App = () => {
  const role = localStorage.getItem("role");
  console.log(role);

  return (
    <div>
      <Provider>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" >
          <a class="navbar-brand" href="/">Vinoteka</a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/proizvodaci">Proizvođači </a>
              </li>

              {
                role === "Admin" ?
                  <li class="nav-item active">
                    <a class="nav-link" href="/addVine">Dodaj vino</a>
                  </li> : " "}

              {
                role === "Admin" ?
                  <li class="nav-item active">
                    <a class="nav-link" href="/addProizvodac">Dodaj proizvođača</a>
                  </li>
                  : " "}
              {
                role ?
                  <li class="nav-item active">
                    <a class="nav-link" href="/logout">Logout</a>
                  </li>
                  : <li class="nav-item active">
                    <a class="nav-link" href="/login">Login</a>
                  </li>}

            </ul>
          </div>
        </nav>
        <br />
        <Router>
          <SearchParams path="/" />
          <DetailsVina path="/vino/details/:vino" />
          <DetailsProizvodaca path="/proizvodac/details/:proizvodac" />
          <Proizvodaci path="/proizvodaci" />
          <AddVine path="/addVine" />
          <AddProizvodac path="/addProizvodac" />
          <EditVino path="/vino/edit/:vino" />
          <EditProizvodac path="/proizvodac/edit/:proizvodac" />
          <Login path="/login" />
          <Register path="/register" />
          <Logout path="/logout" />
        </Router>
      </Provider>
    </div>
  )
}

//ReactDOM.render(React.createElement(App), document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));
