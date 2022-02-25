import React, { useState, useEffect } from 'react';
import AnswersList from './AnswersList.jsx'
import LoadMore from './LoadMore.jsx'
import Modal from './Modal.jsx'

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
                  <div key={oneQuestion.question_id}>
                    <div>Q: {oneQuestion.question_body}</div>
                      <AnswersList  question={oneQuestion} searchedTerm={props.searchTerm} key={oneQuestion.question_id} />
                      <Modal currentQuestion={oneQuestion.question_body} currentProduct={props.currentProduct} answers={true} key={i}/>
                      <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount} key={i}/> : <></>}
                      </div>
                    </div>
                )
              }
            } else {
              return (
                <div key={oneQuestion.question_id}>
                  <div>Q: {oneQuestion.question_body}</div>
                  <AnswersList question={oneQuestion} searchedTerm={props.searchTerm} key={oneQuestion.question_id}/>
                  <Modal currentQuestion={oneQuestion.question_body} currentProduct={props.currentProduct} answers={true} key={i}/>
                    <div>{(i === (count - 1)) ? <button onClick={() => (handleCollapse())}>Show less questions</button> : <></>}
                    </div>
                </div>
              )
            }
          })}
      </div>
    )
  } else {
    // if i === props.questions.length
      // hide button
    // else if i === count - 1
      // render loadmore button
    // else
      // render empty div
    // <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount} key={i}/> : <></>} line 74
    // </div>
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
                  <div key={oneQuestion.question_id}>
                    <div>Q: {oneQuestion.question_body}</div>
                      <AnswersList question={oneQuestion} searchedTerm={props.searchTerm} key={oneQuestion.question_id} />
                      <Modal currentQuestion={oneQuestion.question_body} currentProduct={props.currentProduct} answers={true} key={i}/>
                      <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount} key={i}/> : <></>}
                      </div>
                    </div>
                )
              }
            } else {
              return (
                <div key={oneQuestion.question_id}>
                  <div>Q: {oneQuestion.question_body}</div>
                  <AnswersList question={oneQuestion} searchedTerm={props.searchTerm} key={oneQuestion.question_id} key={i}/>
                  <Modal currentQuestion={oneQuestion.question_body} currentProduct={props.currentProduct} answers={true} key={i}/>
                    <div>{(i === (count - 1)) ? <button onClick={() => (handleCollapse())}>Show less questions</button> : <></>}
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



