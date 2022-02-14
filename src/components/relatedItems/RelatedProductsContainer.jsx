import React from 'react';
var axios = require('axios');
import ItemCard from './ItemCard.jsx'

class RelatedProductsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedItems: [1,2,3,4,5]
    }
  }
  render() {
    return (
      <div id="RelatedProductsContainer">
        <h3>Related Items will go here!</h3>
        {console.log('this.state.relatedItems is', this.state.relatedItems)}
        <ItemCard number={this.state.relatedItems[0]} />
        <ItemCard number={this.state.relatedItems[1]} />
        <ItemCard number={this.state.relatedItems[2]} />
      </div>
    )
  }

  componentDidMount() {
    this.getRelatedItems();
  }

  getRelatedItems() {

var data = '';

var config = {
  method: 'get',
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37311/related/',
  headers: {
    'Authorization': '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'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log('successful call to related products endpoint:')
  console.log(JSON.stringify(response.data));
  this.state.relatedItems = response.data;
})
.catch((error) => {
  console.log(error);
});

  }
}

export default RelatedProductsContainer;