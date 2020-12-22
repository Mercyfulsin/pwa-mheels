import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../components/Loading";
import API from "../utils/API";
import { useAuth0 } from "../../react-auth0-spa";

const ValidateUser = (prop) => {
    const { user } = useAuth0();
    prop.func(user.sub);
    return <Loading />
}

class Validate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        }
    }

    getUser = id => {
        API.getVendor(id)
            .then(reply => {
                reply.data.length ? this.setState({ status: 1 }) : this.setState({ status: -1 });
            });
    }

    render() {
        switch (this.state.status) {
            case 0: return <ValidateUser func={this.getUser} />
            case 1: return <Redirect to='/' />
            case -1: return <Redirect to='/info' />
        }
    }
};

export default Validate;
