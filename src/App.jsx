import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Art from './components/Art';
import About from './components/About';
import Contact from './components/Contact';
import Darkmode from './components/Darkmode';
import Neko from './services/neko';

function App() {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <Neko />
    <Darkmode></Darkmode>
    {showPopup && <div className='popup'>Hint: Double-Click Cat to make it sleep.</div>}
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art" element={<Art />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
