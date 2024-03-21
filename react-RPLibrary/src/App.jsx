import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage";
import Login from "./Login";
import Register from "./Register";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<FrontPage />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
