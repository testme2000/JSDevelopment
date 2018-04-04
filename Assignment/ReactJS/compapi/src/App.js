import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        
        this.state = { data:['setState...'] }
        this.setStateHandler = this.setStateHandler.bind(this);
    };
    
    setStateHandler() {
        var item = 'setState...';
        var myArray = this.state.data;
        
        myArray.push(item)
        
        this.setState({ data: myArray})
        alert(this.state.data);
    };
    
    render() {
        return ( <div>
                    <button onClick = { this.setStateHandler}>SET STATE</button>
                    <h4>State Array: { this.state.data}</h4>
                </div>
            
        );
    }
}

export default App;
