import React from 'react';
var axios = require('axios');
import ItemCard from './ItemCard.jsx'
import { API_KEY } from '../../../config.js';

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
        'Authorization': API_KEY
      }
    })
  }

  getProductStyles(itemNumber) {
    console.log('getProductStyles running...')
    return axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${itemNumber}/styles`,
      headers: {
        'Authorization': API_KEY
      }
    })
  }

  buildRelatedItemProperties() {

    let accumulatorArray = []

    this.props.relatedItems.forEach(element => { //iterate through relatedItems prop
      Promise.all([
        this.getProductInfo(element), //fetch info for this item from the products API
        this.getProductStyles(element) //fetch info for this item from the styles API
      ]).then((responseArray) => {   //for now only responseArray[0] has data
        console.log('drilling down', responseArray[1].data.results[0].photos[0].thumbnail_url)
        let tempObject = {           //create an object with this item's info
          id: element,
          name: responseArray[0].data.name,
          category: responseArray[0].data.category,
          price: responseArray[0].data.default_price,
          rating: 5
        }

        if (responseArray[1].data.results[0].photos[0].thumbnail_url === null) {
          tempObject.picture = `https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png`
        } else {
          tempObject.picture = responseArray[1].data.results[0].photos[0].thumbnail_url
        }

        accumulatorArray.push(tempObject) //& push on accumulator
        console.log(responseArray[0].data)
      }).then(() => {
        this.setState({
          relatedProductsWithInfo: accumulatorArray
        })
      }).catch((error) => {
        console.log(error);
      });
    }) //end of forEach

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