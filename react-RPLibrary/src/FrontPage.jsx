import React from 'react'
import { useState, useEffect } from 'react';
import ThemeControl from './Components/ThemeControl';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';

function FrontPage() {
  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-12">
            <Navbar />
          </div>
        </div>
        <div className="row col-12 flex">
          <div className="w-1/12 h-svh sticky top-1/4">
            <div className="sticky left-0">
              <Sidebar />
            </div>
          </div>
          <div className="col-11">
            <a className="btn btn-primary">TailwindBtn</a>
            <a className="btn btn-secondary">AAAA</a>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, iure odit ipsa cupiditate iusto veniam porro, fugiat illum, totam libero cumque repellendus. Fugiat, libero! Ut, voluptatum et enim consequatur accusantium modi doloremque inventore odio reiciendis quae quas neque beatae perspiciatis placeat pariatur. Porro nam quasi itaque voluptatibus quae! Temporibus commodi ducimus maiores praesentium, saepe dolor ex labore doloremque eligendi, eveniet ab odit aperiam a est veniam placeat. Dolore exercitationem, porro autem at quibusdam obcaecati, totam consequuntur vel incidunt aliquid modi nihil repudiandae quod a beatae, unde ipsum nam. Eum asperiores quas illum ipsam dolorem similique autem eius sed iste quam.
            </p>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default FrontPage