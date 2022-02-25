import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Styled from 'styled-components'

const QASearchBar = (props) => {

    return (
        <SearchForm>
          <Input type="text" placeholder="Have a question? Search for answers..." name="search" onChange={(e) => (props.searchOnChange(e))}></Input>
          <Button  onClick={(e) => (e.preventDefault())}>Search</Button>
        </SearchForm>
    )
  }

export default QASearchBar;

// STYLED COMPONENTS

const Input = Styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 0px 10px;
  box-sizing: border-box;
`
const SearchForm = Styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: left;
  flex-direction: row;
  padding: 20px 20px;
  box-sizing: border-box;
  width: 100%;
`
const Button = Styled.button`
  border-radius: 3px;
  cursor: pointer;
  float: right;
  text-align: center;
  padding: 12px 20px;
  background: black;
  color: white;
  border: 2px solid white;
  &:hover {
    background-color: lightblue;
  }
`