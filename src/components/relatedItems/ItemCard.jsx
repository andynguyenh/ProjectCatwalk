import React from 'react';

const ItemCard = (props) => (
    <div id="ItemCard">
        {console.log(props)}
        <div>⭐️</div>
            <img src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" width="200" height="200"></img>
        <div id="ItemCard_Category">Category</div>
        <div id="ItemCard_Name">Item Name ({props.id})</div>
        <div id="ItemCard_Price">Price</div>
        <div id="ItemCard_Stars">⭐️⭐️⭐️⭐️⭐️</div>
    </div>
)

export default ItemCard;