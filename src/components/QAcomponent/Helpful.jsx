import React, { useState, useEffect } from 'react'
import Styled from 'styled-components';


const HelpfulAndReport = (props) => {
  const [helpful, setHelpful] = useState(props.helpfulness)
  // const [report, setReport] = useState(props.question.reported)
  const type = ''
  useEffect(() => {
    setHelpful(props.helpfulness)
  }, [props.questions])

  const handleHelpfulClick = () => {
    props.updateHelpful(props.question.question_id);
  }



  return (
    <div>
      <div>Helpful?</div>
      <StyledYes onClick={() => {
        handleHelpfulClick()
        setHelpful(helpful + 1)
      }}>Yes ({helpful})</StyledYes>
    </div>
  )
}

export default HelpfulAndReport;

// STYLED COMPONENTS

const StyledYes = Styled.button`
    color: white;
`
//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=37311&question_id=543266&page=1&count=2