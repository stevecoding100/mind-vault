import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
// import GoogleAI from "./components/GoogleAI.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <NextUIProvider>
                <App />
                {/* <GoogleAI /> */}
            </NextUIProvider>
        </BrowserRouter>
    </React.StrictMode>
);
