const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="100" src={props.url} />
      <div style={{display: 'inline-block', marginLeft: 10 }}>
    			<div style={{fontSize: '1.25em', fontWeight: 'bold' }}>Name : {props.name}</div>
      		<div>Company : {props.company}</div>
      </div>
    </div>
  );
};

let Details = [
	{ name : "testme2000",
    company: "Self Emplyeed",
    url: "https://avatars2.githubusercontent.com/u/18150078?v=4"},
	{ name : "Who know",
    company: "Self Emplyeed",
    url: "https://avatars2.githubusercontent.com/u/6820?v=3"},
	{ name : "testme999",
    company: "Self Emplyeed",
    url: "https://avatars2.githubusercontent.com/u/18150078?v=4"}


];

const CardList = (props) => {
	return (
  	<div>
    	<div>Here is Card List</div>
    	{props.cards.map(card => <Card {...card} />)}
    </div>
  );
};


ReactDOM.render(<CardList cards={Details}/>,mountNode);