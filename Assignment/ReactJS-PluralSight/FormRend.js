const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="100" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10 }}>
    			<div style={{fontSize: '1.25em', fontWeight: 'bold' }}>Name : {props.name}</div>
      		<div>Company : {props.company}</div>
      </div>
    </div>
  );
};


const CardList = (props) => {
	return (
  	<div>
    	<div>Here is Card List</div>
    	{props.cards.map(card => <Card {...card} />)}
    </div>
  );
};

class Form extends React.Component {
	state = { userName: ''}


	handleSubmit = (event) => {
  	event.preventDefault();
    console.log("Event log : " + this.state.userName);
    var giturl = 'https://api.github.com/users/' + this.state.userName; 
    axios.get(giturl)
    		  .then(resp => {
             this.props.onSubmit(resp.data);
          });
  };


	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
				<input type="text" 
        ref={(input) => this.userNameInput = input}
        value={this.state.userName}
        onChange={(event) => this.setState({ userName: event.target.value })}
        placeholder="Github User : " requried />      
      	<button type="submit">Add card</button>
      </form>
    );
  }
} 

class App extends React.Component {
	state = {
        cards : []
  };

	addNewCard = (cardInfo) => {
      this.setState(prevState => ({
          cards : prevState.cards.concat(cardInfo)
      })); 
      console.log(cardInfo);
  };

	render() {
		return (
    	<div>
			<Form onSubmit={this.addNewCard} />      
      		<CardList cards={this.state.cards} />
      </div>
    );
  }
}



ReactDOM.render(<App />,mountNode);