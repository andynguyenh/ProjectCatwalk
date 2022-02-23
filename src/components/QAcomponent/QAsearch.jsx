import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components'

const QASearchBar = (props) => {

    return (
    <div>
        <SearchForm>
          <Input type="text" placeholder="Have a question? Search for answers!" name="search" onChange={(e) => (props.searchOnChange(e))}></Input>
          <Button  onClick={(e) => (e.preventDefault())}>Search</Button>
        </SearchForm>
    </div>

    )
  }

export default QASearchBar;

// STYLED COMPONENTS

const Input = Styled.input`
  width: 80%;
  border: 1px solid green;
`

const SearchForm = Styled.form`
  width: 100%;
`
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