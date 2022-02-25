import React, { useState } from 'react';
import Styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    let body = {}

    console.log(props)
    console.log('body in modal', body)
    console.log('data', data)

    if (!props.answers) {
      body = {
        body: data.question,
        name: data.username,
        email: data.email,
        product_id: props.currentProduct_id
      }
      console.log('this works in modal')
      props.addQorA(props.currentProduct_id, null, body)
    } else {
      body = {
        body: data.answer,
        name: data.username,
        email: data.email,
      }
      props.addQorA(props.currentQuestion_id, 'answers', body)
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
      <ModalApp>
        {isOpen && (
          <>
            <Overlay ></Overlay>
            <StyledModal>
              <ModalHeader>
                <CloseButton onClick={closeModal}>Close</CloseButton>
                <h2>Ask Your Question</h2>
                <h3>About the {props.currentProduct}</h3>
              </ModalHeader>
              <ModalMain>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Label>
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
                  </Label>
                  <CloseButton type='submit'>Submit</CloseButton>
                </form>
              </ModalMain>
              <br></br>
            </StyledModal>
          </>
        )}
        <ButtonDiv>
          <Button type='button' onClick={openModal}>Add Question</Button>
        </ButtonDiv>
      </ModalApp>
    );
  } else {
    return (
      <ModalApp>
        {isOpen && (
          <>
            <Overlay></Overlay>
            <StyledModal>
              <ModalHeader>
                <CloseButton onClick={closeModal}>Close</CloseButton>
                <h2>Submit an Answer</h2>
                <h3>{props.currentProduct}: {props.currentQuestion}</h3>
              </ModalHeader>
              <ModalMain>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <Label>
                    Your Answer:
                    <input type="text" name="answer" {...register('answer', {required: true, maxLength: 1000})} />
                    {errors.answer && errors.answer.type === "required" && <Error>This field is required.</Error>}
                    {errors.answer && errors.answer.type === "maxLength" && <Error>Length exceeded. Must be less than 1000 characters.</Error>}
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
                  </Label>
                  <CloseButton type='submit'>Submit</CloseButton>
                </form>
              </ModalMain>
              <br></br>
            </StyledModal>
          </>
        )}
        {/* <h2>This is H2 for adding answer or question</h2> */}
        <AddAnswerButton onClick={openModal}>Add Answer</AddAnswerButton>
      </ModalApp>
    );
  }

}

export default Modal;

// STYLE COMPONENTS

const ModalApp = Styled.div`
  width: 50%;
  padding: 16px 1px;
`
const Overlay = Styled.div`
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
const ModalHeader = Styled.header`
  background: indigo;
  padding: 20px 20px;
  display: block;
  justify-content: space-between;
`
const ModalMain = Styled.main`
  padding: 20px;
`
const Label = Styled.label`
  display: block;
  white-space: pre-wrap;
  float: left;
`
const CloseButton = Styled.button`
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
const AddAnswerButton = Styled.button`
  display: flex;
  text-decoration: underline;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`
const Error = Styled.span`
  color: red;
`
const ButtonDiv = Styled.div`
  width: 50%;
  padding: 16px 1px;
`