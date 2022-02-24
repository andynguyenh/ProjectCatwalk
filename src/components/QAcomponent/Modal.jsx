import React, { useState } from 'react';
import Styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);



  const {register, handleSubmit, formState: { errors } } = useForm(

  )

  const onSubmit = (data) => {
    console.log('data', data)
    if (props.answers) {
      props.addQorA()

    }
    closeModal()
  }


  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }



  if (props.questions) {
    return (
      <StyledModalApp>
        {isOpen && (
          <>
            <StyledOverlay ></StyledOverlay>
            <StyledModal>
              <StyledModalHeader>
                <StyledCloseButton onClick={closeModal}>Close</StyledCloseButton>
                <h2>Ask Your Question</h2>
                <h3>About the {props.currentProduct}</h3>
              </StyledModalHeader>
              <StyledModalMain>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <StyledLabel>
                    Your Question:
                    <input type="text" name="question" {...register('question', {required: true, maxLength: 1000})} />
                    {errors.question && errors.question.type === "required" && <Error>This field is required.</Error>}
                    {errors.question && errors.question.type === "maxLength" && <Error>Length exceeded. Must be less than 1000 characters.</Error>}
                    <br></br>
                    Your Nickname:
                    <input type="text" name="username" {...register('username', {required: true, maxLength: 60})}/>
                    {errors.username && errors.username.type === "required" && <Error>This field is required.</Error>}
                    {errors.username && errors.username.type === "maxLength" && <Error>Length exceeded. Must be less than 60 characters.</Error>}

                    <br></br>
                    Your E-mail:
                    <input type="text" name="email" {...register('email', {required: true, maxLength: 60, pattern: {value: /\S+@\S+\.\S+/}})} />
                    {errors.email && errors.email.type === "required" && <Error>This field is required.</Error>}
                    {errors.email && errors.email.type === "maxLength" && <Error>Length exceeded. Must be less than 60 characters.</Error>}
                    {errors.email && errors.email.type === "pattern" && <Error>Please enter email with correct format.</Error>}
                  </StyledLabel>
                  <StyledCloseButton type='submit'>Submit</StyledCloseButton>
                </form>
              </StyledModalMain>
              <br></br>
            </StyledModal>
          </>
        )}

        <StyledButton type='button' onClick={openModal}>Add Question</StyledButton>
      </StyledModalApp>
    );
  } else {
    return (
      <StyledModalApp>
        {isOpen && (
          <>
            <StyledOverlay></StyledOverlay>
            <StyledModal>
              <StyledModalHeader>
                <StyledCloseButton onClick={closeModal}>Close</StyledCloseButton>
                <h2>Submit an Answer</h2>
                <h3>{props.currentProduct}: {props.currentQuestion}</h3>
              </StyledModalHeader>
              <StyledModalMain>
                <form>
                  <StyledLabel>
                    Your Answer:
                    <input type="text" name="name" />
                    <br></br>
                    Your Nickname:
                    <input type="text" name="name" />
                    <br></br>
                    Your E-mail:
                    <input type="text" name="name" />
                  </StyledLabel>
                </form>
              </StyledModalMain>
              <br></br>
              <StyledCloseButton onClick={closeModal}>Submit Answer</StyledCloseButton>
            </StyledModal>
          </>
        )}

        {/* <h2>This is H2 for adding answer or question</h2> */}
        <StyledButton onClick={openModal}>Add Answer</StyledButton>
      </StyledModalApp>
    );
  }

}

export default Modal;

// STYLE COMPONENTS

const StyledModalApp = Styled.div`
  width: 90%;
  padding: 50px;
`
const StyledOverlay = Styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`
const StyledModal = Styled.div`
  position: fixed;
  z-index: 20;
  background: #fff;
  width: 500px;

  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`
const StyledModalHeader = Styled.header`
  background: indigo;
  padding: 20px 20px;
  display: block;
  justify-content: space-between;
`
const StyledModalMain = Styled.main`
  padding: 20px;
`
const StyledLabel = Styled.label`
  display: block;
  white-space: pre-wrap;
  float: left;
`
const StyledCloseButton = Styled.button`
  display: block;
  border-radius: 3px;
  cursor: pointer;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: black;
  color: white;
  border: 2px solid white;
  float: right;
  &:hover {
    background-color: lightblue;
  }
`
const StyledButton = Styled.button`
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
const Error = Styled.span`
  color: red;
`