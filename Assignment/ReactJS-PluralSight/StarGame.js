const Stars = (props) => {
	return (
  	<div className="col-5">
    	<i className="fa fa-star"></i>
    	<i className="fa fa-star"></i>
    	<i className="fa fa-star"></i>
    	<i className="fa fa-star"></i>
    	<i className="fa fa-star"></i>
    </div>
  );
}

const Button = (props) => {
	return (
  	<div className="col-2">
    	<button>=</button>
    </div>
  );
}

const Answer = (props) => {
	return (
  	<div className="col-5">
    	...
    </div>
  );
}

class Game extends React.Component {
	render() {
  	return (
    	<div className="container">
      	<h3>Play nice and Play Cool</h3>
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>  
      </div>
    );
  }
}

class App extends React.Component {
	render() {
  	return (
    	<div>
      	<h1>Lets the game begin</h1>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
