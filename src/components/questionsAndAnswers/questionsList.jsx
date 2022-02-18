import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import AnswersList from './answersList.jsx'
import LoadMore from './LoadMore.jsx'

const QuestionsList = (props) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [count, setCount] = useState(2)

  useEffect(() => {
    setShowQuestions(false)
  }, [props.questions])

  const handleCollapse = () => {
    setShowQuestions(false);
  }

  return (
    // when show is false,
      // render only up to four questions
    // when show is true,
      // render all the questions
    <div>
        {props.questions.map((oneQuestion, i) => {
          if (!showQuestions) {
            if (i < count) {
              return (
                <div>
                  <div>Q: {oneQuestion.question_body}</div>
                    <AnswersList question={oneQuestion} key={oneQuestion.question_id}/>
                    <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} /> : <></>}
                    </div>
                  </div>
              )
            }
          } else {
            return (
              <div>
                <div>Q: {oneQuestion.question_body}</div>
                <AnswersList question={oneQuestion} key={oneQuestion.question_id}/>
                  <div>{(i === props.questions.length - 1) ? <button onClick={() => (handleCollapse())}>Show less questions</button> : <></>}
                  </div>
              </div>
            )
          }
        })}
    </div>
  )
}

export default QuestionsList;



