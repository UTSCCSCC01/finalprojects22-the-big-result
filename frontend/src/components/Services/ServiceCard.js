
import React from 'react';
// import classes from './ServiceCard.css'
import './ServiceCard.css'

const ServiceCard = (props) => {
    console.log(props);
    return (
        <div className="service-card">
            <h3>{props.service}</h3>
            <p>{props.id}</p>
        </div>
    )

    
    
}

export default ServiceCard;