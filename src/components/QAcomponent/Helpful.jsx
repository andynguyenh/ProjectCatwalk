import React, { useState, useEffect } from 'react'
import Styled from 'styled-components';


const HelpfulAndReport = (props) => {
  const [helpful, setHelpful] = useState(props.helpfulness)
  const [reported, setReported] = useState(false)
  let type = ''

  useEffect(() => {
    setHelpful(props.helpfulness)
  }, [props.questions])

  useEffect(() => {
    setReported(props.reported)
    // type = 'Reported'
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
    if (type === 'Helpful?') {
      return (
        <div>
          <div>{type}</div>
          <Button onClick={() => {
            handleHelpfulAndReportClick()
            setHelpful(helpful + 1)
          }}>Yes {helpful}</Button>
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
            setReported(true)
          }}>{(!reported) ? <Button>{type}</Button> : <Reported>Reported</Reported>}
          </Button>
        </div>
      )
    }
  } else {
    if (type === 'Helpful?') {
      return (
        <div>
          <div>{type}</div>
          <Button onClick={() => {
            handleHelpfulAndReportClick()
            setHelpful(helpful + 1)
          }}>Yes {helpful}</Button>
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
            setReported(true)
          }}>{(!reported) ? <Button>{type}</Button> : <Reported>Reported</Reported>}
          </Button>
        </div>
      )
    }
  }
}

export default HelpfulAndReport;

// STYLED COMPONENTS

const Button = Styled.a`
    color: white;
    :hover {
      color: blue;
    }
`
const Reported = Styled.div`
    color: red;
`