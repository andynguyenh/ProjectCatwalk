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
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Header>Questions and Answers</Header>
        <QASearchBar searchOnChange={this.handleOnChange}/>
        <QuestionsList questions={this.props.currentQuestions} currentProduct={this.props.currentProduct.name} currentProduct_id={this.props.currentProduct.id} updateHelpful={this.props.updateHelpful} addQorA={this.props.addQorA} searchTerm={this.state.searchTerm.length >= 3 ? this.state.searchTerm : ''}/>
      </div>
    )
  }
}

export default QuestionsAndAnswers;

// STYLED COMPONENTS

const Header = Styled.div`
color: black;
padding: 20px;
margin-top: 40px;
font-weight: bold;
font-size: 30px;
border-bottom: 3px solid black;

`
const BottomButtons = Styled.div`
  display: flex;
  flex-direction: row;
`