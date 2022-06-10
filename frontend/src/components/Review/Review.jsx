import { useEffect, useState } from 'react'
import "./Review.css";

function Review(props) {
  return(
    <div className="review">
      <div className="review-img-container">
        <img src={props.imageLink}></img>
        <h4>Review by: {props.reviewedBy}</h4>
      </div>
      <div className="review-text">
        <div className="review-subhead">
          <h2>{props.service}</h2>
          <h2 id="rating">Rating: {props.rating}</h2>
        </div>
        <p>{props.reviewDescription}</p>
      </div>
    </div>
  );
}

export default Review;
