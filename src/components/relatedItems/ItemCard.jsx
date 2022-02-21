import React from 'react';

const ItemCard = (props) => (
    <div id="ItemCard">
        {console.log(props.productInfo.picture)}
        <div>⭐️</div>
            <img src={props.productInfo.picture} width="200" height="200"></img>
        <div id="ItemCard_Name">{props.productInfo.name}</div>
        <div id="ItemCard_Category">{props.productInfo.category}</div>
        <div id="ItemCard_Price">{props.productInfo.price}</div>
        <div id="ItemCard_Stars">{props.productInfo.rating}</div>
    </div>
)

export default ItemCard;