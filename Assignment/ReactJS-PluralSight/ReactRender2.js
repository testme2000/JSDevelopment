class Button extends React.Component {
  render() {
  	return (
    	<button onClick={this.props.OnClickFunction}>
      	+1
      </button>
    );
  };
}


const Result = (props) => {
	return (
  	<div>{props.finalResult}</div>
  );
}

class App extends React.Component {
	state = { counter: 999};	
  
  incrementCounter = () => {
  	this.setState((prevState) => ({
    	counter: prevState.counter + 5
    }));
  };
  
  render() {
		return (
    	<div>
      	<Button OnClickFunction={this.incrementCounter}/>
        <Result finalResult={this.state.counter}/>
      </div>
    );
  }
}


ReactDOM.render(<App />, mountNode);
