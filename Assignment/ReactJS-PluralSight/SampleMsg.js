lass Form extends React.Component {
	constructor(props) {
  	super(props);
  	this.state = {value:''};
	
 }
 handleInput = () => {
  	alert(this.state.value);
  }


	render() {
  	return (
    	<div>
      	<h4>Here goes the form</h4>
        <form onSubmit={this.handleInput}>
          <input type="text" value={this.state.value}/>
          <input type="submit" />
        </form>  
      </div>
    
    );
  }
}



class App extends React.Component {
	render() {
  	return (
    	<div>
				<h3>This is testing</h3>   
        <Form />
      </div>
    );	
  }
}


ReactDOM.render(<App />,mountNode);