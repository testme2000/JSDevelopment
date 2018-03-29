import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor() {
        super();
        
        this.state = {
            data: [{
                "id"    : 1,
                "name"  : "Meku",
                "age"   : 29
            },
            {
                "id"    : 2,
                "name"  : "Teku",
                "age"   : 32
            },
            {
                "id"    : 3,
                "name"  : "Hemaku",
                "age"   : 32
            }]
        }
    }
    
    
    render() {
        return (
            <div>
                <Header />
                <table>
                    <tbody>
            this.state.data.map((person, i) => <TableRow key = {i}
                               data = { person} />)}<
                </table>    
            </tbody>
            </div>
        );
            }
        }
        class Header extends React.Component {
            render() {
                return (
                    <div><h1>Header</h1></div>
                );
            }
        }

        class TableRow extends React.Component {
            render() {
                return ( 
                    <tr>
                        <td>{this.props.data.id }</td>
                        <td>{this.props.data.name}</td>
                        <td>{this.props.data.age}</td>
                    </tr>
                );
            }
        }
    }
}

export default App;
