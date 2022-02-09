import React from 'react';
import ReactDOM from 'react-dom';
//import Overview from './Overview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (<h1>Project Catwalk Hello World !!</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));