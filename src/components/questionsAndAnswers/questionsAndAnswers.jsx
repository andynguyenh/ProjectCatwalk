import React from 'react';
import ReactDOM from 'react-dom'
import QAList from './qalist.jsx'
import QASearchBar from './qaSearchBar.jsx'
import Styled from 'styled-components'

class QuestionAndAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
            <h2 className="QA-header">Question and Answers</h2>
            </div>
        )
    }
}


export default QuestionAndAnswers;

