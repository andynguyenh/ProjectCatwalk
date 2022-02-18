import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { API_KEY } from '../config.js';
import OverviewAllie from './components/productDetailsAllie/overviewAllie.jsx';
import QuestionsAndAnswers from './components/questionsAndAnswers/questionsAndAnswers.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
import RelatedItems from './components/relatedItems/relatedItems.jsx';
import QuestionsList from './components/questionsAndAnswers/questionslist.jsx'
import QASearchBar from './components/questionsAndAnswers//qaSearchBar.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      styles: [],
      currentProduct: [],
      currentProductID: '',
      currentQuestions: [],
      currentStyle: [],
      image: '',
      price: '',
      skus: [],
    }
    this.getProducts = this.getProducts.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.getCurrentProductQuestionsAndAnswers = this.getCurrentProductQuestionsAndAnswers.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products', { headers: { Authorization: `${API_KEY}` } })
      .then(productRes => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productRes.data[0].id}/styles`, { headers: { Authorization: `${API_KEY}` } })
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
              currentProductID: productRes.data[0].id,
              styles: styleRes.data.results,
              currentStyle: styleRes.data.results[0],
              image: styleRes.data.results[0].photos[0].thumbnail_url,
              price: stylePrice,
              skus: skuArray
            })
          })
            .then(() => {
              this.getCurrentProductQuestionsAndAnswers(this.state.currentProductID)
            })
            .catch((err) => {
              console.log(err)
            })
      })
      .catch(err => {
        console.log(err);
      })
  }

  getCurrentProductQuestionsAndAnswers(currentProductID) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${currentProductID}`, { headers: { Authorization: API_KEY } })
      .then((questions) => {
        this.setState({
          currentQuestions: questions.data.results
        })
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
      image: style.photos[0].thumbnail_url,
      price: stylePrice,
      skus: skuArray
    })
  }

  updateProduct(product) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}/styles`, { headers: { Authorization: `${API_KEY}` } })
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
      console.log('styleres', styleRes)
      this.setState({
        currentProduct: product,
        currentProductID: styleRes.data.product_id,
        styles: styleRes.data.results,
        currentStyle: styleRes.data.results[0],
        image: styleRes.data.results[0].photos[0].thumbnail_url,
        price: stylePrice,
        skus: skuArray
      })
    })
      .then(() => {
        this.getCurrentProductQuestionsAndAnswers(this.state.currentProductID)
      })
      .catch((err) => {
        console.log(err)
      })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <h1>Project Catwalk Hello World !!</h1>
        <OverviewAllie products={this.state.products} currentProduct={this.state.currentProduct} styles={this.state.styles} price={this.state.price} currentStyle={this.state.currentStyle} image={this.state.image} skus={this.state.skus} updateStyle={this.updateStyle} updateProduct={this.updateProduct} />
        <hr></hr>
        <QuestionsAndAnswers currentQuestions={this.state.currentQuestions}/>
        <hr></hr>
        <RatingsAndReviews />
        <RelatedItems currentProduct={this.state.currentProduct}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));