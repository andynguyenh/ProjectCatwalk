import React, { useState, useEffect } from 'react';
import AnswersList from './AnswersList.jsx'
import LoadMore from './LoadMore.jsx'
import Modal from './Modal.jsx'
import Styled from 'styled-components'
import HelpfulAndReport from './Helpful.jsx'

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
      <QAcontainer>
        {props.questions.map((oneQuestion, i) => {
          if (!showQuestions) {
            if (i < count) {
              return (
                <div key={oneQuestion.question_id}>
                  <QuestionLineContainer>
                    <Question>Q: {oneQuestion.question_body}</Question>
                    <MoveRight>
                      <HelpfulAndReport help={true} helpfulness={oneQuestion.question_helpfulness} question={oneQuestion} updateHelpful={props.updateHelpful} reported={oneQuestion.reported} questionOrAnswer={'question'}/>
                      <Divide>|</Divide>
                      <Modal currentQuestion={oneQuestion.question_body} currentQuestion_id={oneQuestion.question_id} currentProduct={props.currentProduct} addQorA={props.addQorA} answers={true} key={i}/>
                    </MoveRight>
                  </QuestionLineContainer>

                  <AnswerLineContainer>
                    <AnswersList  question={oneQuestion} updateHelpful={props.updateHelpful} searchedTerm={props.searchTerm} key={oneQuestion.question_id} />
                  </AnswerLineContainer>

                  <BottomButtons>
                  <div>
                      {(props.questions.length > 2 && <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount} key={i}/> : <></>}
                      </div>)}
                  </div>
                  <div>
                    {(props.questions.length > 2 && <div>{(i === (count - 1)) ? <Modal questions={true} currentProduct={props.currentProduct} currentProduct_id={props.currentProduct_id} addQorA={props.addQorA}/> : <></>}
                    </div>)}
                  </div>
                  </BottomButtons>

                </div>
              )
            }
          } else {
            if (i < count) {
              return (
                <div key={oneQuestion.question_id}>
                  <QuestionLineContainer>
                    <Question>Q: {oneQuestion.question_body}</Question>
                    <MoveRight>
                      <HelpfulAndReport help={true} helpfulness={oneQuestion.question_helpfulness} question={oneQuestion} updateHelpful={props.updateHelpful} reported={oneQuestion.reported} questionOrAnswer={'question'}/>
                      <Divide>|</Divide>
                      <Modal currentQuestion={oneQuestion.question_body} currentQuestion_id={oneQuestion.question_id} currentProduct={props.currentProduct} addQorA={props.addQorA} answers={true} key={i}/>
                    </MoveRight>
                  </QuestionLineContainer>
                  <AnswerLineContainer>
                    <AnswersList question={oneQuestion} updateHelpful={props.updateHelpful} searchedTerm={props.searchTerm} key={oneQuestion.question_id}/>
                  </AnswerLineContainer>

                  <BottomButtons>
                    <div>
                      {(i < props.questions.length && <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount} key={i}/> : <></>}
                      </div>)}
                    </div>
                    <div>
                      {(i < props.questions.length && <div>{(i === (count - 1)) ? <Modal questions={true} currentProduct={props.currentProduct} currentProduct_id={props.currentProduct_id} addQorA={props.addQorA}/> : <></>}
                      </div>)}
                    </div>
                  </BottomButtons>

                </div>
              )
            }
          }
        })}
      </QAcontainer>
    )
  } else {
    return (
      <QAcontainer>
          {props.questions.filter((oneQuestion) => {
            if (oneQuestion.question_body.toLowerCase().includes(props.searchTerm.toLowerCase())) {
              return oneQuestion
            }
          }).map((oneQuestion, i) => {
            if (!showQuestions) {
              if (i < count) {
                return (
                  <div key={oneQuestion.question_id}>
                    <QuestionLineContainer>
                      <Question>Q: {oneQuestion.question_body}</Question>
                      <MoveRight>
                        <HelpfulAndReport help={true} helpfulness={oneQuestion.question_helpfulness} question={oneQuestion} updateHelpful={props.updateHelpful} reported={oneQuestion.reported} questionOrAnswer={'question'}/>
                        <Divide>|</Divide>
                        <Modal currentQuestion={oneQuestion.question_body} currentProduct={props.currentProduct} currentQuestion_id={oneQuestion.question_id} answers={true} addQorA={props.addQorA} key={i}/>
                      </MoveRight>
                    </QuestionLineContainer>

                    <AnswerLineContainer>
                      <AnswersList question={oneQuestion} updateHelpful={props.updateHelpful} addQorA={props.addQorA} searchedTerm={props.searchTerm} key={oneQuestion.question_id} />
                    </AnswerLineContainer>

                    <BottomButtons>
                  <div>
                      {(props.questions.length > 2 && <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount} key={i}/> : <></>}
                      </div>)}
                  </div>
                  <div>
                    {(props.questions.length > 2 && <div>{(i === (count - 1)) ? <Modal questions={true} currentProduct={props.currentProduct} currentProduct_id={props.currentProduct_id} addQorA={props.addQorA}/> : <></>}
                    </div>)}
                  </div>
                  </BottomButtons>

                  </div>
                )
              }
            } else {
              if (i < count) {
                return (
                  <div key={oneQuestion.question_id}>
                    <QuestionLineContainer>
                      <Question>Q: {oneQuestion.question_body}</Question>
                      <MoveRight>
                        <HelpfulAndReport help={true} helpfulness={oneQuestion.question_helpfulness} question={oneQuestion} updateHelpful={props.updateHelpful} reported={oneQuestion.reported} questionOrAnswer={'question'}/>
                        <Divide>|</Divide>
                        <Modal currentQuestion={oneQuestion.question_body} currentProduct={props.currentProduct} currentQuestion_id={oneQuestion.question_id} addQorA={props.addQorA} answers={true} key={i}/>
                        </MoveRight>
                    </QuestionLineContainer>
                    <AnswerLineContainer>
                      <AnswersList question={oneQuestion} updateHelpful={props.updateHelpful} searchedTerm={props.searchTerm} key={oneQuestion.question_id} key={i}/>
                    </AnswerLineContainer>

                    <BottomButtons>
                      <div>
                        {(i < props.questions.length && <div>{(i === (count - 1)) ? <LoadMore setShowQuestions={setShowQuestions} count={count} setCount={setCount} key={i}/> : <></>}
                        </div>)}
                      </div>
                      <div>
                        {(i < props.questions.length && <div>{(i === (count - 1)) ? <Modal questions={true} currentProduct={props.currentProduct} currentProduct_id={props.currentProduct_id} addQorA={props.addQorA}/> : <></>}
                        </div>)}
                      </div>
                    </BottomButtons>
                  </div>
                )
              }
            }
          })}
      </QAcontainer>
    )
  }
}

export default QuestionsList;

const MoveRight = Styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
const QAcontainer = Styled.div`
  display: relative;
  max-height:100vh;
  overflow-y:scroll;
  &::webkit-scrollbar {
    width: 20;
  };
  &::webkit-scrollbar {
    background-color: transparent;
  };
  &::webkit-scrollbar {
    border-radius: 10px;
    border: 6px solid transparent;
    background-clip: content-box;
  };
  &::webkit-scrollbar {
    background-color: transparent;
  };
`
const QuestionLineContainer = Styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 20px;
`
const AnswerLineContainer = Styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px grey solid;
  padding: 10px 0px;
  max-height:50vh;
  overflow-y:scroll;
  &::webkit-scrollbar {
    width: 20;
  };
  &::webkit-scrollbar {
    background-color: transparent;
  };
  &::webkit-scrollbar {
    border-radius: 10px;
    border: 6px solid transparent;
    background-clip: content-box;
  };
  &::webkit-scrollbar {
    background-color: transparent;
  };
  `

  // height: 303px;
const Divide = Styled.div`
  display: flex;
  justify-content: right;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 0px;
  font-weight: bold;
`
const BottomButtons = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

// answers 50
// questions single screen 100?

const Question = Styled.p`
  color: black;
  font-weight: 700;
  font-size: 20px;
`