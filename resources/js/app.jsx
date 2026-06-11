import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

// Set axios default base URL
import axios from "axios";
axios.defaults.baseURL = "/";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </React.StrictMode>,
);
