import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/index.js'
import 'semantic-ui-css/semantic.min.css'


const store = require('./index.json')

function App() {
  return (
      <div className="App">
          <Home />
    </div>
  );
}

export default App;
