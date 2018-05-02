class Button extends React.Component {
	handleClick = () => {
		this.props.OnClickFunction(this.props.setValue);
  }

  render() {
  	return (
    	<button onClick={this.handleClick}>
      	+{this.props.setValue}
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
	state = { counter: 99};	
  
  incrementCounter = (setValue) => {
  	this.setState((prevState) => ({
    	counter: prevState.counter + setValue
    }));
  };
  
  render() {
		return (
    	<div>
      	<Button setValue={1} OnClickFunction={this.incrementCounter}/>
      	<Button setValue={5} OnClickFunction={this.incrementCounter}/>
      	<Button setValue={10} OnClickFunction={this.incrementCounter}/>
        <Result finalResult={this.state.counter}/>
      </div>
    );
  }
}


ReactDOM.render(<App />, mountNode);
