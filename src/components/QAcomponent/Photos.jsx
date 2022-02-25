import React from 'react'
import Styled from 'styled-components'


const DisplayPhotos = (props) => {
  console.log(props.photos)

  // return(
  //   <img src={props.photos[0]}></img>
  // )

  return (
    <div>
      {props.photos.map((onePhoto, i) => {
        return (
          <Photo src={onePhoto} width="100" height="100"></Photo>
        )
      })}
    </div>
  )
}

export default DisplayPhotos;

const Photo = Styled.img`
  margin: 5px;
  padding-top: 10px;
`