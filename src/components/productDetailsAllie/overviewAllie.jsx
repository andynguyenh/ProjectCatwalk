import React from 'react';

class OverviewAllie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: '',
            quantity: ''
        }
        this.selectedStyle = this.selectedStyle.bind(this);
        this.selectedProduct = this.selectedProduct.bind(this);
    }

    selectedStyle(style) {
        this.props.updateStyle(style);
    }

    selectedProduct(product) {
        this.props.updateProduct(product);
    }


    render() {
        return (
            <div class="overviewContainer">
                <div class="gallery">
                    <b>Image Gallery</b>
                    {this.props.products.map((product, i) => (
                        <div onClick={() => this.selectedProduct(product)} key={i}>{product.name}</div>
                    ))}
                    <img src={this.props.image}></img>
                </div>
                <div class="ratings"><b>Star Rating</b></div>
                <div class="category">
                    <div><b>Category</b></div>
                    <div>{this.props.currentProduct.name}</div>
                    <div>{this.props.currentStyle.name}</div>
                    <div>${this.props.price}</div>
                </div>
                <div class="style">
                    <b>Style > Selected Style</b>
                    {this.props.styles.map((style, i) => (
                        <div onClick={() => this.selectedStyle(style)} key={i}>{style.name}</div>
                    ))}
                </div>
                <div class="selection">
                    <div>
                        <div>sizes</div>
                        {this.props.skus.map((sku, i) => (
                            <div key={i}>{sku.size}</div>
                        ))}
                    </div>
                    <div>
                        <div>quantity</div>
                        {this.props.skus.map((sku, i) => (
                            <div key={i}>{sku.quantity}</div>
                        ))}
                    </div>
                </div>
                <div class="description">
                    <div><b>Descripiton</b></div>
                    <div>Slogan: {this.props.currentProduct.slogan}</div>
                    <div>Description: {this.props.currentProduct.description}</div>
                </div>
            </div>
        )
    }
}


export default OverviewAllie;