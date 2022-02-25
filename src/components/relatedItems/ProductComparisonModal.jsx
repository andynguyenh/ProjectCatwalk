import React from 'react';
import StarRating from '../StarRating.jsx'

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
      <div>⭐️</div>
      {console.log('props in the modal:', props)}
      <img src={props.itemCardData.picture} width="200" height="200"></img>
      <div id="ItemCard_Name">{props.itemCardData.name}</div>
      <div id="ItemCard_Category">{props.itemCardData.category}</div>
      <div id="ItemCard_Price">{props.itemCardData.price}</div>
      <StarRating size={16} rating={props.itemCardData.rating} />
      <hr />
      ohh buddy
      <div>Price: {props.price}</div>
      {console.log(props)}
      <div><img src={props.currentProductImage} width="200" height="200"></img></div>
      </div>
      <div id="modal-footer">Footer</div>
    </div>
  </div>
}

export default ProductComparisonModal;