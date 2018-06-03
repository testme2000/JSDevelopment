const Stars = (props) => {
	//const numberOfStar =1 + Math.floor((Math.random() * 9));
  

	return (
  	<div className="col-5">
    	{_.range(props.numberOfStar).map(i => 
      	<i key={i} className="fa fa-star"></i>
      )}
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
			{props.selectedNumbers.map((numbers, i) => 
      	<span key={i}>{numbers}</span>
      )}
    </div>
  );
}

const Numbers = (props) => {
	const numberClassName = (number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected';
    }
  }

	return (
  	<div className="class text-center">
    	<div>
				{Numbers.list.map((number, i) =>
        	<span key={i} className={numberClassName(number)}
								onClick={() => props.selectNumber(number)}>
          {number}</span>
        )}
			</div>
    </div>
  );
}

Numbers.list = _.range(1,10);



class Game extends React.Component {
	state = {
  	selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
  }
  selectNumber = (clickedNumber) => {
  	if( this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
        selectedNumbers : prevState.selectedNumbers.concat(clickedNumber)
    }));
	}
	render() {
  	return (
    	<div className="container">
      	<h3>Play nice and Play Cool</h3>
        <div className="row">
          <Stars numberOfStar={this.state.randomNumberOfStars} />
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
      <br/>  
      <Numbers  selectedNumbers={this.state.selectedNumbers}
      					selectNumber={this.selectNumber}
      />  
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
