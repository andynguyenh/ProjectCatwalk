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
        console.log(this.props.styles);
        return (
            <div>
                <h2>Overview Module Allie</h2>
                <div>
                    <b>Image Gallery</b>
                    {this.props.products.map((product, i) => (
                        <div onClick={() => this.selectedProduct(product)} key={i}>{product.name}</div>
                    ))}
                    <img src={this.props.image}></img>
                </div>
                <br></br>
                <div><b>Star Rating</b></div>
                <br></br>
                <div>
                    <div><b>Category</b></div>
                    <div>{this.props.currentProduct.name}</div>
                    <div>{this.props.currentStyle.name}</div>
                    <div>${this.props.price}</div>
                </div>
                <br></br>
                <div>
                    <b>Style > Selected Style</b>
                    {this.props.styles.map((style, i) => (
                        <div onClick={() => this.selectedStyle(style)} key={i}>{style.name}</div>
                    ))}
                </div>
                <br></br>
                <div>
                    <div>sizes</div>
                    {this.props.skus.map((sku, i) => (
                        <div key={i}>{sku.size}</div>
                    ))}
                </div>
                <br></br>
                <div>
                    <div>quantity</div>
                    {this.props.skus.map((sku, i) => (
                        <div key={i}>{sku.quantity}</div>
                    ))}
                </div>
                <br></br>
                <div>
                    <div><b>Descripiton</b></div>
                    <div>Slogan: {this.props.currentProduct.slogan}</div>
                    <div>Description: {this.props.currentProduct.description}</div>
                </div>
            </div>
        )
    }
}


export default OverviewAllie;