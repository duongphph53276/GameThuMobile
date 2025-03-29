import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
            <App />
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}