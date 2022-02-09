import React from 'react';
import ReactDOM from 'react-dom';
import OverviewAnisah from './components/productDetailsAnisah/overviewAnisah.jsx';
import OverviewAllie from './components/productDetailsAllie/overviewAllie.jsx';
import QuestionsAndAnswers from './components/questionsAndAnswers/questionsAndAnswers.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
import RelatedItems from './components/relatedItems/relatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>Project Catwalk Hello World !!</h1>
        <OverviewAnisah />
        <OverviewAllie />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
        <RelatedItems />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));