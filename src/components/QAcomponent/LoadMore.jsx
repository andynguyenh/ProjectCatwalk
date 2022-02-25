import React from 'react'
import Styled from 'styled-components'


const LoadMore = (props) => {
  let type = '';

  if (props.answersComponent) {
    type = 'answers'
  } else {
    type = 'questions'
  }

  const handleClick = () => {
    if (type === 'answers') {
      props.setShowAnswers(true)
    } else if (type === 'questions') {
      props.setShowQuestions(true)
      props.setCount(props.count + 2)
    }
  }

  return (
    <ButtonDiv>
      <Button onClick={() => (handleClick())}>Show more {type}</Button>
    </ButtonDiv>
  )
}

export default LoadMore;

// STYLED COMPONENTS

const Button = Styled.button`
display: block;
border-radius: 3px;
cursor: pointer;
padding: 0.5rem 0;
margin: 0.5rem 1rem;
width: 11rem;
color: white;
background: black;
border: 2px solid white;
&:hover {
  background-color: lightblue;
}
`

const ButtonDiv = Styled.div`
  width: 50%;
  padding: 16px 1px;
`