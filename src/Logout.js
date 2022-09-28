import React from "react";
import { redirectTo } from "@reach/router";

const Logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    redirectTo("/login");
    return (<div />);
};
export default Logout;