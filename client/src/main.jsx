import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import TestingAI from "./components/TestingAI.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <NextUIProvider>
                <App />
                <TestingAI />
            </NextUIProvider>
        </BrowserRouter>
    </React.StrictMode>
);
