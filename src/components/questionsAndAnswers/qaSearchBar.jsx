import React from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components'



class QASearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(e) {

  // }

  handleOnChange(e) {
    this.setState({
      term: e.target.value
    })
  }

  render() {
    return (
    <div>
        <SearchForm>
          <Input type="text" placeholder="Have a question? Search for answers!" name="search" onChange={this.handleOnChange}></Input>
          <Button  onClick={this.handleSubmit}>Search</Button>
        </SearchForm>
    </div>

    )
  }
}

export default QASearchBar;

// STYLED COMPONENTS

const Input = Styled.input`
  width: 80%;
`

const SearchForm = Styled.form`
  width: 100%;
`

const Button = Styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  `
