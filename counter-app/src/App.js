import NavBar from "./components/navbar";
import './App.css';
import React, { Component } from 'react';
import Counters from "./components/counters";


class App extends React.Component {
  render() { 
    return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Counters />
      </main>
    </React.Fragment>)
  }
}
 
export default App;

