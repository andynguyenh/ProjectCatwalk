import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import AnswersList from './answersList.jsx'
import LoadMore from './LoadMore.jsx'

const QuestionsList = (props) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [count, setCount] = useState(2)

  useEffect(() => {
    setShowQuestions(false)
    setCount(2)
  }, [props.questions])

  const handleCollapse = () => {
    setShowQuestions(false);
    setCount(count - 2);
  }

  if (props.searchTerm === '') {
    return (
      <div>
          {props.questions.map((oneQuestion, i) => {
            if (!showQuestions) {
              if (i < count) {
                return (
                  <div>
                    <div>Q: {oneQuestion.question_body}</div>
                      <AnswersList question={oneQuestion} searchedTerm={props.searchTerm} key={oneQuestion.question_id} />
                      <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount}/> : <></>}
                      </div>
                    </div>
                )
              }
            } else {
              return (
                <div>
                  <div>Q: {oneQuestion.question_body}</div>
                  <AnswersList question={oneQuestion} searchedTerm={props.searchTerm} key={oneQuestion.question_id} />
                    <div>{(i > props.questions.length - 1) ? <button onClick={() => (handleCollapse())}>Show less questions</button> : <></>}
                    </div>
                </div>
              )
            }
          })}
      </div>
    )
  } else {
    return (
      <div>
          {props.questions.filter((oneQuestion) => {
            if (oneQuestion.question_body.toLowerCase().includes(props.searchTerm.toLowerCase())) {
              return oneQuestion
            }
          }).map((oneQuestion, i) => {
            if (!showQuestions) {
              if (i < count) {
                return (
                  <div>
                    <div>Q: {oneQuestion.question_body}</div>
                      <AnswersList question={oneQuestion} searchedTerm={props.searchTerm} key={oneQuestion.question_id} />
                      <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount}/> : <></>}
                      </div>
                    </div>
                )
              }
            } else {
              return (
                <div>
                  <div>Q: {oneQuestion.question_body}</div>
                  <AnswersList question={oneQuestion} searchedTerm={props.searchTerm} key={oneQuestion.question_id} />
                    <div>{(i > props.questions.length - 1) ? <button onClick={() => (handleCollapse())}>Show less questions</button> : <></>}
                    </div>
                </div>
              )
            }
          })}
      </div>
    )
  }
}

export default QuestionsList;



