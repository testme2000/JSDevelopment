const Stars = (props) => {
	const numberOfStar =1 + Math.floor((Math.random() * 9));
  var stars = [];
  for(let count = 0;count < numberOfStar; count++) {
  	stars.push(<i key={count} className="fa fa-star"></i>);
  }

	return (
  	<div className="col-5">
    	{stars}
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

const Numbers = (props) => {
	return (
  	<div className="class text-center">
    	<div>
				<span>1</span>      
				<span class="selected">2</span>      
				<span class="used">3</span>      
      </div>
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
      <br/>  
      <Numbers />  
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
