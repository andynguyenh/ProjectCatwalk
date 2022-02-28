import React from 'react';
import StarRating from '../StarRating.jsx'
import Styled from 'styled-components'

const ProductComparisonModal = (props) => {
  if (!props.show) {
    return null
  }

  return <div id="comparison-modal">
    <div id="modal-content">
      <div id="modal-header"><h2>Comparing</h2><button onClick={e => {
        props.showModal()
      }
      }>Close</button></div>
      <div id="modal-body">
        <div id="comparisonProductModalPane">
          <h3>Comparison Item</h3>
          <img src={props.itemCardData.picture} width="450" height="450"></img>
          <div><StarRating size={16} rating={props.itemCardData.rating} /></div>
          <div id="ItemCard_Name">Name: {props.itemCardData.name}</div>
          <div id="ItemCard_Category">Category: {props.itemCardData.category}</div>
          <div id="ItemCard_Price">Price: ${props.itemCardData.price}</div>
        </div>
        <div id="currentProductModalPane">
          <h3>Current Item</h3>
          <div><img src={props.currentProductImage} width="450" height="450"></img></div>
          <div><StarRating size={16} rating={props.currentItemRating} /></div>
          <div>Name: {props.currentProduct.name}</div>
          <div>Category: {props.currentProduct.category}</div>
          <div>Price: ${props.currentProductPrice}</div>
        </div>
      </div>
      <div id="modal-footer">Footer</div>
    </div>
  </div>
}

export default ProductComparisonModal;