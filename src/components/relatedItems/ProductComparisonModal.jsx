import React from 'react';

const ProductComparisonModal = (props) => {
  if (!props.show) {
    return null
  }
  return <div id="comparison-modal">
    <div id="modal-content">
      <div id="modal-header"><h2>Compare Products</h2><button onClick={e => {
        props.showModal()
      }
      }>Close</button></div>
      <div id="modal-body">
      <div>⭐️</div>
      <img src={props.modalContents.picture} width="200" height="200"></img>
      <div id="ItemCard_Name">{props.modalContents.name}</div>
      <div id="ItemCard_Category">{props.modalContents.category}</div>
      <div id="ItemCard_Price">{props.modalContents.price}</div>
      <div id="ItemCard_Stars">{props.modalContents.rating}</div>
      </div>
      <div id="modal-footer">Footer</div>
    </div>
  </div>
}

export default ProductComparisonModal;