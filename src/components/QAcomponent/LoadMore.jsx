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

  return(
    <Button onClick={() => (handleClick())}>Show more {type}</Button>
  )
}

export default LoadMore;

// STYLED COMPONENTS

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