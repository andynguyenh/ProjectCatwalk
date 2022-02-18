import React from 'react'

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
    <button onClick={() => (handleClick())}>Show more {type}</button>
  )
}

export default LoadMore;