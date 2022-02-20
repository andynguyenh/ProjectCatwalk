import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { API_KEY } from '../config.js';
import OverviewAnisah from './components/productDetailsAnisah/overviewAnisah.jsx';
import OverviewAllie from './components/productDetailsAllie/overviewAllie.jsx';
import QuestionsAndAnswers from './components/questionsAndAnswers/questionsAndAnswers.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
import RelatedItems from './components/relatedItems/relatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      styles: [],
      currentProduct: [],
      currentStyle: [],
      image: '',
      price: '',
      skus: []
    }
    this.getProducts = this.getProducts.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }


  getProducts() {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products', { headers: { Authorization: API_KEY } })
      .then(productRes => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productRes.data[0].id}/styles`, { headers: { Authorization: API_KEY } })
          .then(styleRes => {
            // create sku array of objects so easier to map through in component
            let skuArray = [];
            let allSkus = styleRes.data.results[0].skus;
            for (let key in allSkus) {
              let skuObj = {};
              skuObj.id = key;
              skuObj.quantity = allSkus[key].quantity;
              skuObj.size = allSkus[key].size;
              skuArray.push(skuObj);
            }

            // check for sale price otherwise default price
            let stylePrice;
            if (styleRes.data.results[0].sale_price !== null) {
              stylePrice = styleRes.data.results[0].sale_price;
            } else {
              stylePrice = styleRes.data.results[0].original_price;
            }

            this.setState({
              products: productRes.data,
              currentProduct: productRes.data[0],
              styles: styleRes.data.results,
              currentStyle: styleRes.data.results[0],
              image: styleRes.data.results[0].photos[0].url,
              price: stylePrice,
              skus: skuArray
            })
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateStyle(style) {
    let stylePrice;
    if (style.sale_price !== null) {
      stylePrice = style.sale_price;
    } else {
      stylePrice = style.original_price;
    }
    let skuArray = [];
    for (let key in style.skus) {
      let skuObj = {};
      skuObj.id = key;
      skuObj.quantity = style.skus[key].quantity;
      skuObj.size = style.skus[key].size;
      skuArray.push(skuObj);
    }

    this.setState({
      currentStyle: style,
      image: style.photos[0].url,
      price: stylePrice,
      skus: skuArray
    })
  }

  updateProduct(product) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}/styles`, { headers: { Authorization: API_KEY } })
    .then(styleRes => {
      // create sku array of objects so easier to map through in component
      let skuArray = [];
      let allSkus = styleRes.data.results[0].skus;
      for (let key in allSkus) {
        let skuObj = {};
        skuObj.id = key;
        skuObj.quantity = allSkus[key].quantity;
        skuObj.size = allSkus[key].size;
        skuArray.push(skuObj);
      }

      // check for sale price otherwise default price
      let stylePrice;
      if (styleRes.data.results[0].sale_price !== null) {
        stylePrice = styleRes.data.results[0].sale_price;
      } else {
        stylePrice = styleRes.data.results[0].original_price;
      }

      this.setState({
        currentProduct: product,
        styles: styleRes.data.results,
        currentStyle: styleRes.data.results[0],
        image: styleRes.data.results[0].photos[0].url,
        price: stylePrice,
        skus: skuArray
      })
    })
    .catch(err => {
      console.log(err);
    })
  }


  render() {
    return (
      <div>
        <h1>Project Catwalk Hello World !!</h1>
        <OverviewAnisah />
        <OverviewAllie products={this.state.products} currentProduct={this.state.currentProduct} styles={this.state.styles} price={this.state.price} currentStyle={this.state.currentStyle} image={this.state.image} skus={this.state.skus} updateStyle={this.updateStyle} updateProduct={this.updateProduct} />
        <QuestionsAndAnswers currentProduct={this.state.currentProduct}/>
        <RatingsAndReviews />
        <RelatedItems currentProduct={this.state.currentProduct}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));