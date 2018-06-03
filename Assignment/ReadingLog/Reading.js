'use strict';

class ReadingLogForm extends React.Component {
    render() {
        return (
            <form>
            	<div>
                <label>Book Title : </label>
              </div>
              <div>
                <label>Author : </label>
              </div>  
            </form>
        
        );
    }
}

ReactDOM.render(<ReadingLogForm />, mountNode);