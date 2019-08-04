import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/index.js'

const store = require('./index.json')

function App() {
    console.log(store)
  return (
      <div className="App">
          <Home />
    </div>
  );
}

export default App;
