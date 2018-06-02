const Stars = (props) => {
	const numberOfStar =1 + Math.floor((Math.random() * 9));
  //var stars = [];
  //for(let count = 0;count < numberOfStar; count++) {
  //	stars.push(<i key={count} className="fa fa-star"></i>);
  //}

	return (
  	<div className="col-5">
    	{_.range(numberOfStar).map(i => 
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
        	<span key={i} className={numberClassName(number)}>{number}</span>
        )}
			</div>
    </div>
  );
}

Numbers.list = _.range(1,10);



class Game extends React.Component {
	state = {
  	selectedNumbers: [],
  }
	render() {
  	return (
    	<div className="container">
      	<h3>Play nice and Play Cool</h3>
        <div className="row">
          <Stars />
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers} />
        </div>
      <br/>  
      <Numbers  selectedNumbers={this.state.selectedNumbers} />  
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
