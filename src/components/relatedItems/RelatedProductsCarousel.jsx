import React from 'react';
var axios = require('axios');
import ItemCard from './ItemCard.jsx'

class RelatedProductsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsIndex: 0,
      relatedProductsSorted: []
    }
  }

  //TODO: Set decrement and increment to gray out the buttons at ends
  decrementRelatedProducts() {
    if (this.state.relatedProductsIndex > 0) {
      const newValue = this.state.relatedProductsIndex - 1;
      this.setState({
        relatedProductsIndex: newValue
      })
      sortRelatedProducts()
    }
  }

  incrementRelatedProducts() {
    if (this.state.relatedProductsIndex < this.props.relatedItems.length - 1) {
      const newValue = this.state.relatedProductsIndex + 1;
      this.setState({
        relatedProductsIndex: newValue
      })
      sortRelatedProducts()
    }
  }

  //TODO: use ComponentDidUpdate() to reset all this when the main current product is changed
  // sortRelatedProducts() {
  //   console.log('sorting the relatedItems array:')
  //   let relatedProductsSorted = this.props.relatedItems;

  //   if (this.relatedProductsIndex > 0) {
  //     let tempArray = relatedProductsSorted.slice(0, relatedProductsIndex)
  //     relatedProductsSorted.concat(tempArray);
  //   }
  //   this.setState({
  //     this.props.relatedItems: sortRelatedProducts
  //   })
  // }

  render() {
    return (
      <div>
        <h3>Related Items: {this.props.currentProduct.name} ({this.state.relatedProductsIndex}/{this.props.relatedItems.length - 1})</h3>

        <div id="buttonLeftRight">
          <button onClick={() => {
            this.decrementRelatedProducts()
          }
          }>Previous</button>
          <button onClick={() => {
            this.incrementRelatedProducts()
          }
          }>Next</button>
        </div>

        <div id="RelatedProductsCarousel">
          {this.props.relatedItems.map((id) => (
            <ItemCard id={id} key={id} />
          ))}
        </div>
      </div>
    )
  }
}

export default RelatedProductsCarousel;