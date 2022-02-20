import React from 'react';

class OverviewAllie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: ['-'],
            toggle: true,
            slideIndex: 0,
            slides: document.getElementsByClassName('slide')
        }
        this.selectedStyle = this.selectedStyle.bind(this);
        this.selectedProduct = this.selectedProduct.bind(this);
        this.setQuantity = this.setQuantity.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }

    selectedStyle(style) {
        this.state.slides[this.state.slideIndex].style.display = 'none';
        this.props.updateStyle(style);
        this.setState({
            toggle: true,
            slideIndex: 0,
            quantity: ['-']
        })
    }

    selectedProduct(product) {
        // this.state.slides[this.state.slideIndex].style.display = 'none';
        this.props.updateProduct(product);
        this.setState({
            toggle: true,
            slideIndex: 0
        })
    }

    setQuantity(quantity) {
        let quantityArray = [];
        let i = 1;
        while (i <= quantity) {
            quantityArray.push(i);
            i++;
            if (i >= 16) {
                break;
            }
        }
        this.setState({
            quantity: quantityArray
        })
    }

    nextSlide() {
        if (this.state.slideIndex === this.props.currentStyle.photos.length - 1) {
            this.state.slides[this.props.currentStyle.photos.length - 1].style.display = 'none';
            this.state.slides[0].style.display = 'block';
            this.setState({
                toggle: false,
                slideIndex: 0,
            });
        } else {
            this.state.slides[this.state.slideIndex].style.display = 'none';
            this.state.slides[this.state.slideIndex + 1].style.display = 'block';
            this.setState({
                toggle: false,
                slideIndex: this.state.slideIndex + 1
            })
        }
    }

    previousSlide() {
        if (this.state.slideIndex === 0) {
            this.state.slides[0].style.display = 'none';
            this.state.slides[this.props.currentStyle.photos.length - 1].style.display = 'block';
            this.setState({
                toggle: false,
                slideIndex: this.props.currentStyle.photos.length - 1
            })
        } else {
            this.state.slides[this.state.slideIndex].style.display = 'none';
            this.state.slides[this.state.slideIndex - 1].style.display = 'block';
            this.setState({
                toggle: false,
                slideIndex: this.state.slideIndex - 1
            })
        }
    }


    render() {
        console.log(this.state.slides);
        return (
            <div className="overviewContainer">
                <div className="gallery">
                    <b>Image Gallery</b>
                    {this.props.products.map((product, i) => (
                        <div onClick={() => this.selectedProduct(product)} key={i}>{product.name}</div>
                    ))}
                    <div className='slideshow-container'>
                        {this.state.toggle
                            ? <div className='active'>
                                <img className='main-image' src={this.props.image}></img>
                            </div>
                            : null
                        }
                        {this.props.currentStyle.photos?.map((photo, i) => (
                            <div className='slide' key={i}>
                                <img className="main-image" src={photo.url}></img>
                            </div>
                        ))}
                        <a className='prev' onClick={this.previousSlide}>&#10094;</a>
                        <a className='next' onClick={this.nextSlide}>&#10095;</a>
                    </div>
                </div>
                <div className="ratings">
                    <b>Star Rating</b>
                </div>
                <div className="category">
                    <div><b>Category</b></div>
                    <div>{this.props.currentProduct.name}</div>
                    <div>{this.props.currentStyle.name}</div>
                    <div>${this.props.price}</div>
                    <div><b>Style > </b>{this.props.currentStyle.name}</div>
                </div>
                <div className="style">
                    {this.props.styles.map((style, i) => (
                        <img className='style-image' height='65' width='60' src={style.photos[0].thumbnail_url} onClick={() => this.selectedStyle(style)} key={i}></img>
                    ))}
                </div>
                <div className="selection">
                    <select onChange={() => this.setQuantity(event.target.value)}>
                        <option>Select Size</option>
                        {this.props.skus.map((sku, i) => (
                            <option key={i} value={sku.quantity}>{sku.size}</option>
                        ))}
                    </select>
                    <select>
                        {this.state.quantity.map((number, i) => (
                            <option key={i}>{number}</option>
                        ))}
                    </select>
                    <button>Add to Cart</button>
                </div>
                <div className="description">
                    <div><b>Descripiton</b></div>
                    <div>Slogan: {this.props.currentProduct.slogan}</div>
                    <div>Description: {this.props.currentProduct.description}</div>
                </div>
            </div >

        )
    }
}


export default OverviewAllie;