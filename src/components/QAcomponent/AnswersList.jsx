import React, { useState } from 'react'
import dateFormat from 'dateformat'
import LoadMore from './LoadMore.jsx'
import Modal from './Modal.jsx'
import Styled from 'styled-components'

const AnswersList = (props) => {
  const [showAnswers, setShowAnswers] = useState(false);
  var answers = props.question.answers;
  var answersArray = [];
  var answerKeys = Object.keys(answers)
  for (let i = 0; i < answerKeys.length; i++) {
    answersArray.push(answers[answerKeys[i]])
  }
  answersArray.sort((a,b) => (a.helpfulness < b.helpfulness ? 1 : -1))

  const handleCollapse = () => {
    setShowAnswers(false);
  }

  return (
    <div>
      {answersArray.map((oneAnswer, i) => {
        if (!showAnswers) {
          if (answersArray.length === 2) {
            <div key={oneAnswer.id}>
                <div>A: {oneAnswer.body}</div>
                <div>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</div>
            </div>
          } else if (i < 2) {
            return (
              <div key={oneAnswer.id}>
                <div>A: {oneAnswer.body}</div>
                <div>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</div>
                <div>{(i === 1) ? <LoadMore setShowAnswers={setShowAnswers} answersComponent={true} key={oneAnswer.id}/> : <></>}</div>
              </div>
            )
          }
        } else {
          return (
            <div key={oneAnswer.id}>
              <div>A: {oneAnswer.body}</div>
              <div>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</div>
                <div>{(i === answersArray.length - 1) ? <Button onClick={() => (handleCollapse())}>Collapse Answers</Button> : <></>}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default AnswersList;

// STYLED COMPONENTS

const Button = Styled.button`
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: black;
  color: white;
  border: 2px solid white;
  &:hover {
    background-color: lightblue;
  }
  `