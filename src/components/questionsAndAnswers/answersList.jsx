import React, { useState } from 'react'
import LoadMore from './LoadMore.jsx'

const AnswersList = (props) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [collapseAnswers, setCollapseAnswers] = useState(false);

  var answers = props.question.answers;
  var answersArray = [];
  var answerKeys = Object.keys(answers)
  for (let i = 0; i < answerKeys.length; i++) {
    answersArray.push(answers[answerKeys[i]])
  }

  const handleCollapse = () => {
    setShowAnswers(false);
  }

  return (
    // if show is false,
      // render only 2 answers per question
    // else if show is true
      // render all the answers per question
    <div>
      {answersArray.map((oneAnswer, i) => {
        if (!showAnswers) {
          if (answersArray.length === 2) {
            <div>
                <div>A: {oneAnswer.body}</div>
            </div>
          } else if (i < 2) {
            return (
              <div>
                <div>A: {oneAnswer.body}</div>
                <div>{(i === 1) ? <LoadMore setShowAnswers={setShowAnswers} answersComponent={true}/> : <></>}</div>
              </div>
            )
          }
        } else {
          return (
            <div>
              <div>A: {oneAnswer.body}</div>
                <div>{(i === answersArray.length - 1) ? <button onClick={() => (handleCollapse())}>Show less answers</button> : <></>}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default AnswersList;

