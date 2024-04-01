import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import "normalize.css";
import AuthProvider from "./context/AuthProvider";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="Medicine-front-end">
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
