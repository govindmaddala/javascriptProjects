import React from 'react'
import './App.css';
import 'bootstrap'
// import NavbarEle from './Components/NavbarEle';

import TitleChanger from './Components/TitleChanger';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer';
import Home from './Components/Home/Home.js'

function App() {
  return (
    <div>
      <TitleChanger title="Ecommerce-Home" />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
