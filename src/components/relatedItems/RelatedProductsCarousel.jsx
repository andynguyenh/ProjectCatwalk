import React from 'react';
var axios = require('axios');
import ItemCard from './ItemCard.jsx'

class RelatedProductsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsIndex: 0,
      relatedProductsWithInfo: []
    }
  }

  componentWillLoad() {
    this.buildRelatedItemProperties()
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate running')
    if (this.props.relatedItems !== prevProps.relatedItems) {
      this.buildRelatedItemProperties()
    }
  }

  getProductInfo(itemNumber) {
    return axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${itemNumber}`,
      headers: {
        'Authorization': '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'
      }
    })
  }

  buildRelatedItemProperties() {

    console.log('list of related items:', this.props.relatedItems);
    let accumulatorArray = []

    this.props.relatedItems.forEach(element => { //iterate through relatedItems prop
      Promise.all([
        this.getProductInfo(element) //fetch info for this item from the products API
      ]).then((responseArray) => {   //for now only responseArray[0] has data
        let tempObject = {           //create an object with this item's info
          id: element,
          name: responseArray[0].data.name,
          category: responseArray[0].data.category,
          price: responseArray[0].data.default_price,
          rating: 5
        }
        accumulatorArray.push(tempObject) //& push on accumulator
      }).catch((error) => {
        console.log(error);
      });
    })
    console.log('accumulator array at end of process', accumulatorArray)
    this.setState({
      relatedProductsWithInfo: accumulatorArray
    })
  }

  //TODO: Set decrement and increment to gray out the buttons at ends
  decrementRelatedProducts() {
    console.log(this.state.relatedProductsWithInfo)
    if (this.state.relatedProductsIndex > 0) {
      const newValue = this.state.relatedProductsIndex - 1;
      this.setState({
        relatedProductsIndex: newValue
      })
    }
  }

  incrementRelatedProducts() {
    if (this.state.relatedProductsIndex < this.props.relatedItems.length - 1) {
      const newValue = this.state.relatedProductsIndex + 1;
      this.setState({
        relatedProductsIndex: newValue
      })
    }
  }

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

        {/* {console.log('related items:', this.props.relatedItems)}
        {console.log('this.relatedProductsIndex:', this.state.relatedProductsIndex)} */}

        <div id="RelatedProductsCarousel" style={{ transform: `translateX(-${this.state.relatedProductsIndex * 203}px)` }}>

          {this.state.relatedProductsWithInfo.map((currentProduct) => (
            <ItemCard productInfo={currentProduct} key={currentProduct.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default RelatedProductsCarousel;