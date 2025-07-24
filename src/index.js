// =======================
// index.js
// App entry point – renders main <App /> into root element
// =======================

import React from "react";
import ReactDOM from "react-dom/client";

// Global styles
import "bootstrap/dist/css/bootstrap.min.css";

// Main App
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
