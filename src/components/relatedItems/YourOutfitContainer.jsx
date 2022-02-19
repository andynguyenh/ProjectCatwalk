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
        <h3>Your Outfit will go here</h3>
        <div id="YourOutfitCards">
          <ItemCard id={1} />
          <ItemCard id={2} />
          <ItemCard id={3} />
        </div>
      </div>
    )
  }
}

export default YourOutfitContainer;