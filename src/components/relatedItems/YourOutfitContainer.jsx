import React from 'react';
import ItemCard from './ItemCard.jsx'

class YourOutfitContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div id="YourOutfitContainer">
        <h3>Your Outfit will go here!</h3>
        <ItemCard number={1} />
        <ItemCard number={2} />
        <ItemCard number={3} />
      </div>
    )
  }
}

export default YourOutfitContainer;