import React from 'react';
var axios = require('axios');
import ItemCard from './ItemCard.jsx'
import { API_KEY } from '../../../config.js';
import ProductComparisonModal from './ProductComparisonModal.jsx'

class RelatedProductsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsIndex: 0,
      relatedProductsWithInfo: [],
      modalVisible: false,
      modalContents: {text: 'Hello World!'}
    }

    this.showModal = this.showModal.bind(this)
  }

  componentWillLoad() {
    this.buildRelatedItemProperties()
  }

  componentDidUpdate(prevProps) {
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
      }).then(() => {
        this.setState({
          relatedProductsWithInfo: accumulatorArray
        })
      }).catch((error) => {
        error.log(error);
      });
    }) //end of forEach

  }

  //TODO: Set decrement and increment to gray out the buttons at ends
  decrementRelatedProducts() {
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

  showModal(modalMessage) {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalContents: modalMessage})
  }

  render() {
    return (
      <div id="relatedProductsContainer">
        <ProductComparisonModal show={this.state.modalVisible} showModal={this.showModal} modalContents={this.state.modalContents}/>
        <h3>Related Items: {this.props.currentProduct.name} ({this.state.relatedProductsIndex}/{this.props.relatedItems.length - 1})</h3>

        <div id="buttonLeftRight">
        <a class="relatedButton" onClick={() => {
            this.decrementRelatedProducts()
          }
          }>&#10094; Previous</a>
          <a class="relatedButton" onClick={() => {
            this.incrementRelatedProducts()
          }
          }>Next &#10095;</a>
        </div>
{/*
        <a className='prev' onClick={this.previousSlide}>&#10094;</a>
                        <a className='next' onClick={this.nextSlide}></a> */}

        {/* {console.log('related items:', this.props.relatedItems)}
        {console.log('this.relatedProductsIndex:', this.state.relatedProductsIndex)} */}

        <div id="RelatedProductsCarousel" style={{ transform: `translateX(-${this.state.relatedProductsIndex * 205}px)` }}>

          {this.state.relatedProductsWithInfo.map((currentProduct) => (
            <ItemCard productInfo={currentProduct} key={currentProduct.id} showModal={this.showModal}/>
          ))}
        </div>
      </div>
    )
  }
}

export default RelatedProductsCarousel;