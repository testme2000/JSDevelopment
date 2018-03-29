import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            header: "Header from state...",
            "content" : "Content from state...."
        }
    }
    
    
  render() {
    return (
        <div>
            <h1>{this.state.header}</h1>
            <h2>{this.state.content}</h2>
        </div>
    );
  }
}

export default App;
