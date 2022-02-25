import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Styled from 'styled-components';

const HelpfulAndReport = (props) => {
  const [helpful, setHelpful] = useState(props.helpfulness)
  const [reported, setReported] = useState(false)
  const [clickedHelpful, setClickedHelpful] = useState(false)
  let type = ''

  useEffect(() => {
    setHelpful(props.helpfulness)
  }, [props.questions])

  useEffect(() => {
    setReported(props.reported)
  }, [props.question])

  const handleHelpfulAndReportClick = () => {
    if(props.questionOrAnswer === 'question') {
      console.log('button for questions is working')
      if (props.help) {
        props.updateHelpful('questions', props.question.question_id, 'helpful');
      } else {
        props.updateHelpful('questions', props.question.question_id, 'report');
      }
    } else {
      console.log('button for answers is working')
      if (props.help) {
        props.updateHelpful('answers', props.answer.id, 'helpful');
      } else {
        props.updateHelpful('answers', props.answer.id, 'report');
      }
    }
  }

  if (props.help === true) {
    type = 'Helpful?'
  } else {
    type = 'Report'
  }

  if (props.questionOrAnswer === 'question') {
    if (type === 'Helpful?' && !clickedHelpful) {
      return (
        <div>
          <Helpful>
          <p>{type}</p>
          <Button onClick={() => {
            handleHelpfulAndReportClick()
            setClickedHelpful(true)
            setHelpful(helpful + 1)
          }}>Yes</Button>
          <p>({helpful})</p>
          </Helpful>
        </div>
      )
    } else if (type === 'Helpful?' && clickedHelpful) {
      return (
        <div>
          <p>Helpful?</p>
          <p>Yes</p>
          <p>({helpful})</p>
        </div>
      )
    } else if (type === 'Reported') {
      return (
        <div>
          <div>{type}</div>
        </div>
      )
    } else {
      return (
        <div>
          <Button onClick={() => {
            handleHelpfulAndReportClick()
            setClickedHelpful(true)
            setReported(true)
          }}>{(!reported) ? <p>{type}</p> : <p>Reported</p>}
          </Button>
        </div>
      )
    }
  } else {
    if (type === 'Helpful?' && !clickedHelpful) {
      return (
        <Helpful>
          <p>{type}</p>
          <Button onClick={() => {
            handleHelpfulAndReportClick()
            setClickedHelpful(true)
            setHelpful(helpful + 1)
          }}>Yes</Button>
          <p>({helpful})</p>
        </Helpful>
      )
    } else if (type === 'Helpful?' && clickedHelpful) {
      return (
        <div>
          <p>Helpful?</p>
          <p>Yes</p>
          <p>({helpful})</p>
        </div>
      )
    } else if (type === 'Reported') {
      return (
        <div>
          <p>{type}</p>
        </div>
      )
    } else {
      return (
        <div>
          <Button onClick={() => {
            handleHelpfulAndReportClick()
            setReported(true)
          }}>{(!reported) ? <p>{type}</p> : <p>Reported</p>}
          </Button>
        </div>
      )
    }
  }
}

export default HelpfulAndReport;

// STYLED COMPONENTS

const Button = Styled.button`
  text-decoration: underline;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`
const Helpful = Styled.div`
  display: flex;
  padding: 0px 6px;
`
const Reported = Styled.div`
  color: red;
`