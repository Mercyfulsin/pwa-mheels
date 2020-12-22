import React from 'react';
import { useAuth0 } from "../../../react-auth0-spa";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import logo from "../../assets/landingCart.webp";
import "./Landing.css";

const Landing = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <div>
            <div className="main">
                <div className="text-center hero my-2">
                    <img className="mb-2 app-logo" src={logo} alt="logo" width="120" />
                    <h1 className="title mb-2">Mheels</h1>
                    <p className="lead">
                        Track and Eat
                     </p>
                </div>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-6 text-right">
                            {!isAuthenticated && (
                                <Button color="success" size="lg"
                                    onClick={() => loginWithRedirect({})}
                                >Vendor</Button>)}
                            {isAuthenticated && (
                                <Link to="/menu">
                                    <Button color="success" size="lg">Vendor Menu</Button>
                                </Link>)}
                        </div>
                        <div className="col-6">
                            {!isAuthenticated && (<Link to="/customer"><Button color="info" size="lg" >Customer</Button> </Link>)}
                            {isAuthenticated && (<Link to="/customer"><Button color="info" size="lg" >Customer View</Button> </Link>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;