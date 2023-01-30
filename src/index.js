import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));

const domain = process.env.REACT_APP_DOMAIN;
const clientID = process.env.REACT_APP_CLIENTID;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <AppProvider>
      <App />
    </AppProvider>
  </Auth0Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
