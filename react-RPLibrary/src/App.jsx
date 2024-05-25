import { useEffect, useState } from "react";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import GBookApi from "./Pages/GBookApi";
import ReadPage from "./Pages/ReadPage";
import CreateBookPage from "./Pages/CreateBookPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
    const lenis = useLenis(({ scroll }) => {
        // called every scroll
    })

    return (
        <>
            <ReactLenis root>
                <BrowserRouter>
                    <Routes>
                        <Route path='/*' element={<FrontPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/gbookapi" element={<GBookApi />} />
                    </Routes>
                </BrowserRouter>
            </ReactLenis>
        </>
    );
}

export default App;
