import React, { useState } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="ModalApp">
      {isOpen && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <header className="modal__header">
              <h2>Ask Your Question</h2>
              <h3>About the</h3>
              <button onClick={closeModal} className="close-button">Submit</button>
            </header>
            <main className="modal__main">
              <form>
                <label>
                  Name:
                  <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </main>
          </div>
        </>
      )}

      {/* <h2>This is H2 for adding answer or question</h2> */}
      <button className="button" onClick={openModal}>Add Question or Add Answer</button>
    </div>
  );
}

export default Modal;