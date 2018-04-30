// Write JavaScript here and press Ctrl+Enter to execute

class Button extends React.Component {
	constructor(props) {
  	super(props);
    this.state = { counter: 1 };
  }
	
  handleClickMeku = () => {
    this.setState((prevState) => {
    		return {
    			counter: this.state.counter + 2
      	};
      });
  };
	
	render() {
  	return (
    	<button onClick={this.handleClickMeku}>
      	{this.state.counter}
      </button>
    );
  };
}

ReactDOM.render(<Button />, mountNode);
