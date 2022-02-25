import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fasCheck } from '@fortawesome/fontawesome-free-solid';
import { fabInstagram } from '@fortawesome/fontawesome-free-brands';
import { fabFacebook } from '@fortawesome/fontawesome-free-brands';
import { fabTwitter } from '@fortawesome/fontawesome-free-brands';
import { fabPinterest } from '@fortawesome/fontawesome-free-brands';
import { fasExpand } from '@fortawesome/fontawesome-free-solid'

class OverviewAllie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: ['-'],
            slideIndex: 0,
            slides: document.getElementsByClassName('slide'),
            selectedSize: '',
            selectedId: '',
            selectedQuantity: 0,
            expandImage: false
        }
        this.selectedStyle = this.selectedStyle.bind(this);
        this.selectedProduct = this.selectedProduct.bind(this);
        this.setQuantity = this.setQuantity.bind(this);
        this.expandImage = this.expandImage.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
        this.selectStyleThumbnail = this.selectStyleThumbnail.bind(this);
        this.selectQuantity = this.selectQuantity.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    selectedStyle(style) {
        this.state.slides[this.state.slideIndex].style.display = 'none';
        this.props.updateStyle(style);
        this.state.slides[0].style.display = 'block';
        this.setState({
            slideIndex: 0,
            quantity: ['-']
        })
    }

    selectedProduct(product) {
        this.state.slides[this.state.slideIndex].style.display = 'none';
        this.props.updateProduct(product);
        this.state.slides[0].style.display = 'block';
        this.setState({
            slideIndex: 0
        })
    }

    setQuantity(index) {
        let quantityArray = [];
        let i = 1;
        while (i <= this.props.skus[index].quantity) {
            quantityArray.push(i);
            i++;
            if (i >= 16) {
                break;
            }
        }
        this.setState({
            quantity: quantityArray,
            selectedSize: this.props.skus[index].size,
            selectedId: this.props.skus[index].id
        })
    }

    expandImage() {
        this.setState({
            expandImage: !this.state.expandImage
        })
    }

    nextSlide() {
        if (this.state.slideIndex === this.props.currentStyle.photos.length - 1) {
            this.state.slides[this.props.currentStyle.photos.length - 1].style.display = 'none';
            this.state.slides[0].style.display = 'block';
            this.setState({
                slideIndex: 0,
            });
        } else {
            this.state.slides[this.state.slideIndex].style.display = 'none';
            this.state.slides[this.state.slideIndex + 1].style.display = 'block';
            this.setState({
                slideIndex: this.state.slideIndex + 1
            })
        }
    }

    previousSlide() {
        if (this.state.slideIndex === 0) {
            this.state.slides[0].style.display = 'none';
            this.state.slides[this.props.currentStyle.photos.length - 1].style.display = 'block';
            this.setState({
                slideIndex: this.props.currentStyle.photos.length - 1
            })
        } else {
            this.state.slides[this.state.slideIndex].style.display = 'none';
            this.state.slides[this.state.slideIndex - 1].style.display = 'block';
            this.setState({
                slideIndex: this.state.slideIndex - 1
            })
        }
    }

    selectStyleThumbnail(index) {
        this.state.slides[this.state.slideIndex].style.display = 'none';
        this.state.slides[index].style.display = 'block';
        this.setState({
            slideIndex: index
        });
    }

    selectQuantity(quantity) {
        this.setState({
            selectedQuantity: quantity
        })
    }

    addToCart() {
        this.props.submitCart(this.state.selectedId, this.state.selectedSize, this.state.selectedQuantity);
    }

    render() {
        return (
            <div>
                <div className='navbar'>
                    <h2>Team Hickory</h2>
                </div>
                <div className="overviewContainer">
                    {this.state.expandImage
                    ? <div className='expandedView'>
                    <img className='expanded-image' src={this.props.currentStyle.photos[this.state.slideIndex].url}></img>
                    <FontAwesomeIcon className='expandedIcon' icon="fa-solid fa-expand" onClick={this.expandImage} />
                </div>
                :
                    <div className="gallery">
                        <div className='thumbnail-container'>
                            {this.props.currentStyle.photos?.map((photo, i) => (
                                ((this.props.currentStyle.photos[this.state.slideIndex].thumbnail_url === photo.thumbnail_url)
                                    ? <div key={i}>
                                        <img className='thumbnail-image-border' src={photo.thumbnail_url} height='65' width='60' onClick={() => this.selectStyleThumbnail(i)}></img>
                                    </div>
                                    : <div key={i}>
                                        <img className='thumbnail-image' src={photo.thumbnail_url} height='65' width='60' onClick={() => this.selectStyleThumbnail(i)}></img>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className='slideshow-container'>
                            {/* {this.state.expandImage
                                ?
                                <div className='expandedView'>
                                    <img className='expanded-image' src={this.props.currentStyle.photos[this.state.slideIndex].url}></img>
                                    <FontAwesomeIcon className='expandedIcon' icon="fa-solid fa-expand" onClick={this.expandImage} />
                                </div> : */}
                                 <div>
                                    {this.props.currentStyle.photos?.map((photo, i) => (
                                        <div className={`slide index${i}`} key={i}>
                                            <img className="main-image" src={photo.url}></img>
                                        </div>
                                    ))}
                                    <a className='prev' onClick={this.previousSlide}>&#10094;</a>
                                    <a className='next' onClick={this.nextSlide}>&#10095;</a>
                                    {/* <button className='expand'>Expand</button> */}
                                    <FontAwesomeIcon className='expand' icon="fa-solid fa-expand" onClick={this.expandImage} />
                                </div>
                            {/* } */}
                        </div>
                    </div>
                    }
                    <div className="ratings">
                        {this.state.expandImage
                            ? <div></div>
                            : <div>
                                <b>Products</b>
                                {this.props.products.map((product, i) => (
                                    <div className='products' onClick={() => this.selectedProduct(product)} key={i}>{product.name}</div>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="category">
                        {this.state.expandImage
                            ? <div></div>
                            :
                            <div>
                                <div>{this.props.currentProduct.category}</div>
                                <div><b>{this.props.currentProduct.name}</b></div>
                                {this.props.currentStyle.sale_price
                                    ? <div className="sale-price">${this.props.currentStyle.sale_price} <s>{this.props.currentStyle.original_price}</s></div>
                                    : <div>${this.props.currentStyle.original_price}</div>
                                }
                                <br></br>
                                <div className='styleName'><b>Style > </b>{this.props.currentStyle.name}</div>
                            </div>
                        }
                    </div>
                    {this.state.expandImage
                        ? <div></div>
                        : <div className="style">
                            {this.props.styles.map((style, i) => (
                                ((this.props.currentStyle.style_id === style.style_id)
                                    ?
                                    <div className='style-container'>
                                        {/* <span className='checkmark'>✔</span> */}
                                        <FontAwesomeIcon className='checkmark' icon="fa-solid fa-check" />
                                        <img className='style-image' height='65' width='60' src={style.photos[0].thumbnail_url} onClick={() => this.selectedStyle(style)} key={i}></img>
                                    </div>
                                    :
                                    <div className='style-container'>
                                        <img className='style-image' height='65' width='60' src={style.photos[0].thumbnail_url} onClick={() => this.selectedStyle(style)} key={i}></img>
                                    </div>
                                )
                            ))}
                        </div>
                    }
                    {this.state.expandImage
                        ? <div></div>
                        : <div className="selection">
                            <select className='size-dropdown' onChange={() => this.setQuantity(event.target.value)}>
                                <option>Select Size</option>
                                {this.props.skus.map((sku, i) => (
                                    <option key={i} value={i}>{sku.size}</option>
                                ))}
                            </select>
                            <select className='quantity-dropdown' onChange={() => this.selectQuantity(event.target.value)}>
                                {this.state.quantity.map((number, i) => (
                                    <option key={i} value={number}>{number}</option>
                                ))}
                            </select>
                            <button className='addToCart' onClick={this.addToCart}>Add to Cart</button>
                        </div>
                    }
                    <div className="description">
                        <span className='social-container'>
                            <FontAwesomeIcon icon="fa-brands fa-instagram" />
                            <FontAwesomeIcon icon="fa-brands fa-facebook" />
                            <FontAwesomeIcon icon="fa-brands fa-twitter" />
                            <FontAwesomeIcon icon="fa-brands fa-pinterest" />
                        </span>
                        <br></br>
                        <div className='slogan'>{this.props.currentProduct.slogan}</div>
                        <br></br>
                        <div className='product-description'>{this.props.currentProduct.description}</div>
                    </div>
                    <div className='otherStuff'>
                        {this.props.features?.map((feature, i) => (
                            <div>
                                <div className='feature'>✔ {feature.value} {feature.feature}</div>
                                <br></br>
                            </div>
                        ))}
                    </div>
                </div >
            </div>
        )
    }
}


export default OverviewAllie;