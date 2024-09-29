import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CustomThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CustomThemeProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CustomThemeProvider>
  </BrowserRouter>
);
