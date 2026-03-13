import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Request from "./pages/Request.jsx";
import "./home-page.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/request" element={<Request />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
