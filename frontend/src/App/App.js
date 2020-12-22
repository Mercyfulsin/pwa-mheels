import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import TwitterPost from "./components/TwitterPost";
import Validate from "./pages/Validate";
import Profile from "./pages/Profile";
import Home from './pages/Home';
import List from './pages/List';
import { useAuth0 } from "../react-auth0-spa";
import history from "./utils/history";
import BusinessInfo from './pages/BusinessInfo';
import Landing from './components/Landing';
import Menu from './pages/Menu';
import Customer from './pages/Customer';
// import vendorSeed from '../../../scripts/seedDB'


// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading, user } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Landing} /> 
            <Route path="/customer" exact component={Customer} />        
            <PrivateRoute path="/validate" component={Validate} />
            <PrivateRoute path="/menu" render={()=>(<Menu user={user.sub} />)} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/info" render={()=>(<BusinessInfo user={user.sub} />)} />
            <PrivateRoute path="/list" component={List} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/twitter" render={() =>(<TwitterPost user={user.sub} />)} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
