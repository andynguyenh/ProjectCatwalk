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
      <StyledModalApp className="ModalApp">
        {isOpen && (
          <>
            <StyledOverlay className="overlay"></StyledOverlay>
            <StyledModal className="modal">
              <StyledModalHeader className="modal__header">
                <h2>Ask Your Question</h2>
                <h3>About the {props.currentProduct}</h3>
              </StyledModalHeader>
              <StyledModalMain className="modal__main">
                <form>
                  <label>
                    Your Question:
                    <input type="text" name="name" />
                    Your Nickname:
                    <input type="text" name="name" />
                    Your E-mail:
                    <input type="text" name="name" />
                  </label>
                </form>
              </StyledModalMain>
              <StyledCloseButton onClick={closeModal} className="close-button">Submit Question</StyledCloseButton>
            </StyledModal>
          </>
        )}

        {/* <h2>This is H2 for adding answer or question</h2> */}
        <StyledButton className="button" onClick={openModal}>Add Question</StyledButton>
      </StyledModalApp>
    );
  } else {
    return (
      <StyledModalApp className="ModalApp">
        {isOpen && (
          <>
            <StyledOverlay className="overlay"></StyledOverlay>
            <StyledModal className="modal">
              <StyledModalHeader className="modal__header">
                <h2>Submit an Answer</h2>
                <h3>{props.currentProduct}: {props.currentQuestion}</h3>
              </StyledModalHeader>
              <StyledModalMain className="modal__main">
                <form>
                  <label>
                    Your Answer:
                    <input type="text" name="name" />
                    Your Nickname:
                    <input type="text" name="name" />
                    Your E-mail:
                    <input type="text" name="name" />
                  </label>
                </form>
              </StyledModalMain>
              <StyledCloseButton onClick={closeModal} className="close-button">Submit Answer</StyledCloseButton>
            </StyledModal>
          </>
        )}

        {/* <h2>This is H2 for adding answer or question</h2> */}
        <StyledButton className="button" onClick={openModal}>Add Answer</StyledButton>
      </StyledModalApp>
    );
  }

}

export default Modal;

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
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`
const StyledModalMain = Styled.main`
  padding: 20px;
`
const StyledCloseButton = Styled.button`
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
`
const StyledButton = Styled.button`
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
`
