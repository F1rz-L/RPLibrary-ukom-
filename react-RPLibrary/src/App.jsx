import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FrontPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
