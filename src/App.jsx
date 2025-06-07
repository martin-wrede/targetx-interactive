import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Konzept from './components/Konzept';
import Chatbot from './components/Chatbot';
import ImageGeneration from './components/ImageGeneration';
import Kontakt from './components/Kontakt';

 import './App.css';

function App() {
  return (
      <div className="App" id="wrapper">
        
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/konzept" element={<Konzept />} />
          <Route path="/chatbot" element={<Chatbot/>} />
        
          <Route path="/image-generation" element={<ImageGeneration />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Routes>
      </div>
    
  );
}

export default App;
