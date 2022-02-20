import React, { useState } from 'react'
import dateFormat from 'dateformat'
import LoadMore from './LoadMore.jsx'

const AnswersList = (props) => {
  const [showAnswers, setShowAnswers] = useState(false);
  // const [helpful, setHelpful] = useState()
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
            <div>
                <div>A: {oneAnswer.body}</div>
                <div>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</div>
            </div>
          } else if (i < 2) {
            return (
              <div>
                <div>A: {oneAnswer.body}</div>
                <div>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</div>
                <div>{(i === 1) ? <LoadMore setShowAnswers={setShowAnswers} answersComponent={true}/> : <></>}</div>
              </div>
            )
          }
        } else {
          return (
            <div>
              <div>A: {oneAnswer.body}</div>
              <div>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</div>
                <div>{(i === answersArray.length - 1) ? <button onClick={() => (handleCollapse())}>Collapse Answers</button> : <></>}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default AnswersList;

