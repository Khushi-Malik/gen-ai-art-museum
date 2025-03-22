import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import Home from './Home'; // Import the Home component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Set the Home component as the default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

