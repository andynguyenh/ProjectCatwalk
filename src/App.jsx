import React from 'react';
import ReactDOM from 'react-dom';
import OverviewAllie from './components/productDetailsAllie/overviewAllie.jsx';
import QuestionsAndAnswers from './components/questionsAndAnswers/questionsAndAnswers.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
import RelatedItems from './components/relatedItems/relatedItems.jsx';
import QAList from './components/questionsAndAnswers/qalist.jsx'
import QASearchBar from './components/questionsAndAnswers//qaSearchBar.jsx'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      currentReviews: []
    }
  }



  render() {
    return (
      <div>
        <h1>Project Catwalk Hello World !!</h1>
        <OverviewAllie />
        <RelatedItems />
        <hr></hr>
        <QuestionsAndAnswers />
        <QASearchBar />
        <QAList />
        <hr></hr>
        <RatingsAndReviews />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));