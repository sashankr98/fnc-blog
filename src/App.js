import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar'

function App() {
  const [view, setView] = useState('Posts');

  function handlePageClick(page) {
    setView(page);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Friendly Neighbourhood Cucumber</h1>
        <Navbar pages={['Posts', 'About']} focused={view} onPageClick={handlePageClick}/>
        <p>{view}</p>
      </header>
    </div>
  );
}

export default App;
