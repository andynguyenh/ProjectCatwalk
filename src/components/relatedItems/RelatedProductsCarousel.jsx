import React from 'react';
var axios = require('axios');
import ItemCard from './ItemCard.jsx'
import { API_KEY } from '../../../config.js';
import ProductComparisonModal from './ProductComparisonModal.jsx'
import StarRating from '../StarRating.jsx'

class RelatedProductsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsIndex: 0,
      relatedProductsWithInfo: [],
      modalVisible: false,
      itemCardData: { text: 'Hello World!' }
    }

    this.showModal = this.showModal.bind(this)
  }

  //componentwillunmount?


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

  getProductRatings(itemNumber) {
    return axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/?product_id=${itemNumber}`,
      headers: {
        'Authorization': API_KEY
      }
    })
  }

  averageProductRatings(ratingsObject) {

    let sumOfRatings = 0;
    ratingsObject.data.results.forEach(element => {
      sumOfRatings += element.rating
    })

    return (sumOfRatings / ratingsObject.data.results.length)
  }

  buildRelatedItemProperties() {
    let accumulatorArray = []

    this.props.relatedItems.forEach(element => { //iterate through relatedItems prop
      Promise.all([
        this.getProductInfo(element),   //fetch info for this item from the products API
        this.getProductStyles(element), //fetch info for this item from the styles API
        this.getProductRatings(element) //fetch info for this item from the ratings API
      ]).then((responseArray) => {
        let tempObject = {           //create an object with this item's info
          id: element,
          name: responseArray[0].data.name,
          category: responseArray[0].data.category,
          price: responseArray[0].data.default_price,
          rating: this.averageProductRatings(responseArray[2]),
          features: responseArray[0].data.features
        }

        //use a default placeholder image if none is available from the API
        if (responseArray[1].data.results[0].photos[0].thumbnail_url === null) {
          tempObject.picture = `https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png`
        } else {
          tempObject.picture = responseArray[1].data.results[0].photos[0].thumbnail_url
        }

        accumulatorArray.push(tempObject) // push current item's info onto the accumulator
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

  showModal(individualCardData) {
    this.setState({
      modalVisible: !this.state.modalVisible,
      itemCardData: individualCardData
    })
  }

  render() {
    return (
      <div id="relatedProductsContainer">
        {/* {console.log('image', this.props.currentProductImage)} */}
        <ProductComparisonModal show={this.state.modalVisible} showModal={this.showModal} itemCardData={this.state.itemCardData} currentProduct={this.props.currentProduct} currentProductPrice={this.props.price} currentProductImage={this.props.image} currentProductFeatures={this.props.features}/>
        <div id="buttonLeftRight">
          <a className="relatedButton" onClick={() => {
            this.decrementRelatedProducts()
          }
          }>&#10094; Previous</a>
          <a className="relatedButton" onClick={() => {
            this.incrementRelatedProducts()
          }
          }>Next &#10095;</a>
        </div>
        <div id="RelatedProductsCarousel" style={{ transform: `translateX(-${this.state.relatedProductsIndex * 205}px)` }}>

          {this.state.relatedProductsWithInfo.map((currentProduct) => (
            <ItemCard productInfo={currentProduct} key={currentProduct.id} showModal={this.showModal} />
          ))}
        </div>
      </div>
    )
  }
}

export default RelatedProductsCarousel;