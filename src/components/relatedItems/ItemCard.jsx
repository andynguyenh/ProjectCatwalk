import React from 'react';

const ItemCard = (props) => (
    <div id="ItemCard">
        <div>⭐️</div>
            <img src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" width="200" height="200"></img>
        <div id="ItemCard_Name">{props.productInfo.name}</div>
        <div id="ItemCard_Category">{props.productInfo.category}</div>
        <div id="ItemCard_Price">{props.productInfo.price}</div>
        <div id="ItemCard_Stars">{props.productInfo.rating}</div>
    </div>
)

export default ItemCard;