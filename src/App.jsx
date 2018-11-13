import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputForm from "./InputForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Guitar Fretboard Confibulator</h1>
        <InputForm/>
      </div>
    );
  }
}

export default App;
