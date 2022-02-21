import React from 'react';

const ProductComparisonModal = (props) => {
  if (!props.show) {
    return null
  }
  return <div>
    {props.modalContents.text}
    <button onClick={e => {
      props.showModal()
    }
    }>Close Modal</button>
  </div>
}

export default ProductComparisonModal;