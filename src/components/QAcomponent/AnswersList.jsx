import React, { useState } from 'react'
import dateFormat from 'dateformat'
import LoadMore from './LoadMore.jsx'
import Modal from './Modal.jsx'
import Styled from 'styled-components'
import HelpfulAndReport from './Helpful.jsx'
import DisplayPhotos from './Photos.jsx'

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
            <EachAnswer key={oneAnswer.id}>
                <div>A: {oneAnswer.body}</div>
                <div>
                <DisplayPhotos photos={oneAnswer.photos}/>
                </div>
                <MoveRight>
                  <UserInfo>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</UserInfo>
                  <Divide>|</Divide>
                  <HelpfulAndReport help={true} helpfulness={oneAnswer.helpfulness} answer={oneAnswer} updateHelpful={props.updateHelpful} reported={false} questionOrAnswer={'answer'}/>
                  <Divide>|</Divide>
                  <HelpfulAndReport answer={oneAnswer} updateHelpful={props.updateHelpful} reported={false} type={'answer'}/>
                </MoveRight>
            </EachAnswer>
          } else if (i < 2) {
            return (
              <EachAnswer key={oneAnswer.id}>
                <div>A: {oneAnswer.body}</div>
                <div>
                <DisplayPhotos photos={oneAnswer.photos}/>
                </div>
                <MoveRight>
                  <UserInfo>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</UserInfo>
                  <Divide>|</Divide>
                  <HelpfulAndReport help={true} helpfulness={oneAnswer.helpfulness} answer={oneAnswer} updateHelpful={props.updateHelpful} reported={false} questionOrAnswer={'answer'}/>
                  <Divide>|</Divide>
                  <HelpfulAndReport answer={oneAnswer} updateHelpful={props.updateHelpful} reported={false} type={'answer'}/>
                </MoveRight>
                <div>{(i === 1) ? <LoadMore setShowAnswers={setShowAnswers} answersComponent={true} key={oneAnswer.id}/> : <></>}</div>
              </EachAnswer>
            )
          }
        } else {
          return (
            <EachAnswer key={oneAnswer.id}>
              <div>A: {oneAnswer.body}</div>
              <div>
                <DisplayPhotos photos={oneAnswer.photos}/>
                </div>
              <MoveRight>
                <UserInfo>User: {oneAnswer.answerer_name} Date Posted: {dateFormat(oneAnswer.date, "paddedShortDate", "mm, dd, yyyy")}</UserInfo>
                <Divide>|</Divide>
                <HelpfulAndReport help={true} helpfulness={oneAnswer.helpfulness} answer={oneAnswer} updateHelpful={props.updateHelpful} reported={false} questionOrAnswer={'answer'}/>
                <Divide>|</Divide>
                <HelpfulAndReport answer={oneAnswer} updateHelpful={props.updateHelpful} reported={false} type={'answer'}/>
                </MoveRight>
                <div>{(i === answersArray.length - 1) ? <Button onClick={() => (handleCollapse())}>Collapse Answers</Button> : <></>}
              </div>
            </EachAnswer>
          )
        }
      })}
    </div>
  )
}

export default AnswersList;

// STYLED COMPONENTS
const EachAnswer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;

`
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
const MoveRight = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`
const Divide = Styled.div`
  display: flex;
  justify-content: right;
  font-weight: bold;
`
const UserInfo = Styled.div`
  display: flex;
  margin: 0px 8px;
  padding-left: 12px
`