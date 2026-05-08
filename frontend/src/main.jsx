import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App";
import { Toaster } from "react-hot-toast";
import '../src/index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Toaster />
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  
);