import React,{ useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QuestionsList from './questionslist.jsx';
import AnswersList from './answerslist.jsx';
import QASearchBar from './qaSearchBar.jsx';
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
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    return (
        <div>
          <Header>Questions and Answers</Header>
          <QASearchBar searchOnChange={this.handleOnChange}/>
          <QuestionsList questions={this.props.currentQuestions} searchTerm={this.state.searchTerm.length >= 3 ? this.state.searchTerm : ''}/>
          <Modal />
        </div>
    )
  }
}

export default QuestionsAndAnswers;

const Header = Styled.h2`
color: blue;
`

