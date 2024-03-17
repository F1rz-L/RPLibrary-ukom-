import React from 'react'
import { useState, useEffect } from 'react';
import ThemeControl from './Components/ThemeControl';
import Navbar from './Components/Navbar';

function FrontPage() {
  return (
    <>
    <Navbar />

    <div>
        <a className="btn btn-primary">TailwindBtn</a>
        <a className="btn btn-secondary">AAAA</a>
    </div>
    </>
  )
}

export default FrontPage