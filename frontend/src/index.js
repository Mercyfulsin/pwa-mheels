import React from 'react';
import { render } from 'react-dom';
import { Auth0Provider } from "./react-auth0-spa";
import history from "./App/utils/history";
import './index.css';
import App from './App/App';

const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

render(
    <Auth0Provider
        domain={'twilight-wave-5488.auth0.com'}
        client_id={'rmCKcR4D3Yk7HVYu9N7j-l46R1s0MWw0'}
        redirect_uri={window.location.origin + "/validate"}
        onRedirectCallback={onRedirectCallback}
    >
        <App />
    </Auth0Provider>,
    document.getElementById('root')
);
