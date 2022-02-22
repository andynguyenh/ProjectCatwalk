import React, { useState } from "react";
import Styled from 'styled-components'

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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
                <h2>Ask Your Question</h2>
                <h3>About the {props.currentProduct}</h3>
              </StyledModalHeader>
              <StyledModalMain>
                <form>
                  <StyledLabel>
                    Your Question:
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
              <StyledCloseButton onClick={closeModal}>Submit Question</StyledCloseButton>
            </StyledModal>
          </>
        )}

        {/* <h2>This is H2 for adding answer or question</h2> */}
        <StyledButton onClick={openModal}>Add Question</StyledButton>
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
