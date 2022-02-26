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

        return (<div>
                <RelatedProductsCarousel
                currentProduct={this.props.currentProduct}
                relatedItems={this.props.relatedItems}
                currentProductPrice={this.props.currentProductPrice}
                currentProductImage={this.props.currentProductImage}
                currentProductFeatures={this.props.currentProductFeatures}/>
                {/* <YourOutfitContainer /> */}
            </div>
        )
    }
}

export default RelatedItems;