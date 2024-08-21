import React from 'react'
import { useState, useEffect } from 'react';
import ThemeControl from './Components/ThemeControl';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';
import Skeleton from './Components/Skeleton';
import HomePage from './Pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import BookIndex from './Pages/BookIndex';
import CartPage from './Pages/CartPage';
import ReadPage from './Pages/ReadPage';
import CreateBookPage from './Pages/CreateBookPage';
import AdminPage from './Pages/AdminPage';
import TransactionsPage from './Pages/TransactionsPage';

function FrontPage() {
  return (
    <>
      <div className="overflow-x-clip overflow-y-visible">
        <div className="row">
          <div className="col-12 mb-4">
            <Navbar />
          </div>
        </div>
        <div className="row">
          <div className="col-1 h-svh left-1 justify-center sticky top-1/4">
            <Sidebar />
          </div>
          <div className="col-10 left-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book-index" element={<BookIndex />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path="/create-book" element={<CreateBookPage />} />
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/transactions' element={<TransactionsPage />} />
              <Route path="/read/:bookId" element={<ReadPage />} />
            </Routes>
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