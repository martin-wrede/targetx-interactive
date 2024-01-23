import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import InteractiveContent from './components/InteractiveContent';
import HowWeDoIt from './components/HowWeDoIt';
import Contact from './components/Contact';
import './App.css';
 
function App() {
  return (
      <div className="App" id="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interactive-content" element={<InteractiveContent />} />
      
          <Route path="/how-we-do-it" element={<HowWeDoIt />} />
      
           
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    
  );
}

export default App;
