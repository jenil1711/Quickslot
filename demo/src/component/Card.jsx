import React from 'react';
import './Card.css'

function Card({ sport,func }) {
    return (

        <div className="main">
            <div className='card' onClick={()=>{
                func(sport.id);
            }}>
                <img src={sport.img} alt="Card image" />
                <h2>{sport.id}</h2>
            </div>
        </div>
    );
}

export default Card;
