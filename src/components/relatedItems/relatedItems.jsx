import React from 'react';
import RelatedProductsContainer from './RelatedProductsContainer.jsx'
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
                {console.log('props.currentProduct in relatedItems:', this.props.currentProduct)}
                <h2>Related Products Module </h2>
                <RelatedProductsContainer currentProduct={this.props.currentProduct}/>
                <YourOutfitContainer />
            </div>
        )
    }
}

export default RelatedItems;