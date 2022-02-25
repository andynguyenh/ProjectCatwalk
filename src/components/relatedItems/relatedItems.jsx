import React from 'react';
import RelatedProductsCarousel from './RelatedProductsCarousel.jsx'
import YourOutfitContainer from './YourOutfitContainer.jsx'

class RelatedItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                {/* <h2>Related Products Module</h2> */}
                <RelatedProductsCarousel currentProduct={this.props.currentProduct} relatedItems={this.props.relatedItems}/>
                {/* <YourOutfitContainer /> */}
            </div>
        )
    }
}

export default RelatedItems;