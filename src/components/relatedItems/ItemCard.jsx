import React from 'react';
import StarRating from '../StarRating.jsx'

const ItemCard = (props) => (
    <div id="ItemCard">
        <div id="actionButton" onClick={e => {
        props.showModal(props.productInfo)
    }}>⭐️</div>
        <div><img src={props.productInfo.picture} width="200" height="200"></img></div>
        <div id="ItemCard_Name">{props.productInfo.name}</div>
        <div id="ItemCard_Category">{props.productInfo.category}</div>
        <div id="ItemCard_Price">${props.productInfo.price}</div>
        <StarRating size={16} rating={props.productInfo.rating} />
        </div>
)

export default ItemCard;