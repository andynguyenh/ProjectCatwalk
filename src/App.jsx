import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { API_KEY } from '../config.js';
import OverviewAllie from './components/productDetailsAllie/overviewAllie.jsx';
import QuestionsAndAnswers from './components/QAcomponent/QandA.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
import QuestionsList from './components/QAcomponent/Questionslist.jsx'
import QASearchBar from './components/QAcomponent//QAsearch.jsx'
import RelatedItems from './components/relatedItems/RelatedItems.jsx';


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
      orginalPrice: '',
      skus: [],
      features: [],
      relatedItems: [],
      relatedItemsData: [],
      currentItemRating: 0
    }
    this.getProducts = this.getProducts.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.submitCart = this.submitCart.bind(this);
    this.getCurrentProductQuestionsAndAnswers = this.getCurrentProductQuestionsAndAnswers.bind(this);
    this.updateHelpfulAndReport = this.updateHelpfulAndReport.bind(this)
    this.addQuestionOrAnswer = this.addQuestionOrAnswer.bind(this)
  }

  componentDidMount() {
    this.getProducts();
  }


  //input: array of item numbers related to the current item
  //create array relatedItemsData
  //for each of those items
  //make a new object inside the results array
  //make request to Products API
  //take name, category, and price from this request and add key/value pairs to the current object
  //make request to reviews API for star rating
  //calculate the average rating
  //add rating key/value pair to the object
  //push the object onto relatedItemsData


  getProducts() {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products', { headers: { Authorization: `${API_KEY}` } })
      .then(productRes => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productRes.data[0].id}/styles`, { headers: { Authorization: `${API_KEY}` } })
          .then(styleRes => {
            // start
            axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productRes.data[0].id}`, { headers: { Authorization: `${API_KEY}` } })
            .then(productFeatures => {
              this.setState({
                features: productFeatures.data.features
              })
            })
            // end
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
           this.setAverageRatingOfCurrentProduct(productRes.data[0].id)
            this.setState({
              products: productRes.data,
              currentProduct: productRes.data[0],
              currentProductID: productRes.data[0].id,
              styles: styleRes.data.results,
              currentStyle: styleRes.data.results[0],
              image: styleRes.data.results[0].photos[0].url,
              price: stylePrice,
              originalPrice: styleRes.data.results[0].original_price,
              skus: skuArray
            })
            axios({ //making another request to get the related items array
              method: 'get',
              url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${productRes.data[0].id}/related/`,
              headers: {
                'Authorization': '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'
              }
            })
              .then((relatedItemsResponse) => {
                this.setState({
                  products: productRes.data,
                  currentProduct: productRes.data[0],
                  styles: styleRes.data.results,
                  currentStyle: styleRes.data.results[0],
                  image: styleRes.data.results[0].photos[0].thumbnail_url,
                  price: stylePrice,
                  skus: skuArray,
                  relatedItems: relatedItemsResponse.data
                })

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
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${currentProductID}&page=1&count=50`, { headers: { Authorization: API_KEY } })
      .then((questions) => {
        this.setState({
          currentQuestions: questions.data.results
        })
      })
  }

  updateHelpfulAndReport (QorA, currentQuestion_id, endpoint) {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/${QorA}/${currentQuestion_id}/${endpoint}`, undefined, {
      headers: {Authorization: API_KEY}
    })
  }

  addQuestionOrAnswer (QorA_id, endpoint, body) {
    console.log(body)
    if (endpoint !== 'answers') {
      axios({
        method: 'post',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/',
        headers: {Authorization: API_KEY},
        'content-type': 'application/json',
        data: body
      })
        .then(() => {
          console.log('success')
        })
    } else {
      axios({
        method: 'post',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${QorA_id}/${endpoint}`,
        headers: {Authorization: API_KEY},
        'content-type': 'application/json',
        data: body
      })
        .then(() => {
          console.log('success')
        })
    }
  }

  //axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${QorA_id}/${endpoint}`

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
      orginalPrice: style.original_price,
      skus: skuArray
    })
  }

  updateProduct(product) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}/styles`, { headers: { Authorization: `${API_KEY}` } })
    .then(styleRes => {
      //start
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}`, { headers: { Authorization: `${API_KEY}` } })
      .then(productFeatures => {
        this.setState({
          features: productFeatures.data.features
        })
      })
      // end
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


        this.setState({ //TODO - update relatedItems for Related Items component
          currentProduct: product,
          currentProductID: styleRes.data.product_id,
          styles: styleRes.data.results,
          currentStyle: styleRes.data.results[0],
          image: styleRes.data.results[0].photos[0].url,
          price: stylePrice,
          originalPrice: styleRes.data.results[0].original_price,
          skus: skuArray
        })

        axios({ //making another request to get the related items array
          method: 'get',
          url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}/related/`,
          headers: {
            'Authorization': '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'
          }
        }).then((relatedItemsResponse) => {
          this.setState({
            relatedItems: relatedItemsResponse.data
          })
        })
      }).then(() => {
        this.getCurrentProductQuestionsAndAnswers(this.state.currentProductID)
      })
      .catch((err) => {
        console.log(err)
      })
      .catch(err => {
        console.log(err);
      })
  }

  submitCart(id, size, quantity) {
    console.log(id, size, quantity);
    // send a post request to cart
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


  setAverageRatingOfCurrentProduct(itemNumber) {
    this.getProductRatings(itemNumber).then(response => {
      this.setState( {
        currentItemRating: this.averageProductRatings(response)
      })
    })
  }

  render() {
    return (
      <div>
        <OverviewAllie products={this.state.products} currentProduct={this.state.currentProduct} styles={this.state.styles} price={this.state.price} originalPrice={this.state.originalPrice} currentStyle={this.state.currentStyle} image={this.state.image} skus={this.state.skus} updateStyle={this.updateStyle} updateProduct={this.updateProduct} submitCart={this.submitCart} features={this.state.features}/>
        <RelatedItems currentProduct={this.state.currentProduct} relatedItems={this.state.relatedItems}/>
        <QuestionsAndAnswers currentQuestions={this.state.currentQuestions} currentProduct={this.state.currentProduct} updateHelpful={this.updateHelpfulAndReport} addQorA={this.addQuestionOrAnswer}/>
        <RatingsAndReviews />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));