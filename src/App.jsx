import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import DesignThinking from './components/DesignThinking';
import DesignProjects from './components/DesignProjects';
import HistMuseumBremerhaven from './components/HistMuseumBremerhaven';
import Kammerkonzerte from './components/Kammerkonzerte';
import Passus from './components/Passus';
import Cooperations from './components/Cooperations';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
      <div className="App" id="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-thinking" element={<DesignThinking />} />
          <Route path="/design-projects" element={<DesignProjects />} />
          <Route path="/hist-museum-bremerhaven" element={<HistMuseumBremerhaven />} />
          <Route path="/kammerkonzerte" element={<Kammerkonzerte />} />
          <Route path="/passus" element={<Passus />} />
          <Route path="/cooperations" element={<Cooperations />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    
  );
}

export default App;
