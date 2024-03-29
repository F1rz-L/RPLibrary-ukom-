import { useEffect, useState } from "react";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage";
import Login from "./Login";
import Register from "./Register";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

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
                    </Routes>
                </BrowserRouter>
            </ReactLenis>
        </>
    );
}

export default App;
