import React,{ useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QuestionsList from './Questionslist.jsx';
import AnswersList from './Answerslist.jsx';
import QASearchBar from './QAsearch.jsx';
import Styled from 'styled-components';
import axios from 'axios';
import { API_KEY } from '../../../config.js';
import Modal from './Modal.jsx'


class QuestionsAndAnswers extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          searchTerm: ''
      }
      this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e) {
    console.log(e.target.value)
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    return (
        <div>
          <Header>Questions and Answers</Header>
          <QASearchBar searchOnChange={this.handleOnChange}/>
          <QuestionsList questions={this.props.currentQuestions} currentProduct={this.props.currentProduct.name} updateHelpful={this.props.updateHelpful} searchTerm={this.state.searchTerm.length >= 3 ? this.state.searchTerm : ''}/>
          <Modal questions={true} currentProduct={this.props.currentProduct.name}/>
        </div>
    )
  }
}

export default QuestionsAndAnswers;

// STYLED COMPONENTS

const Header = Styled.h2`
color: indigo;
padding: 20px;
border: 1px solid green;
`

