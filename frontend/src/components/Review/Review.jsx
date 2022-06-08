import { useEffect, useState } from 'react'

function Review(props) {
  return(
    <div className="review">
      <img src="https://picsum.photos/100"></img>
      <div className="review-text">
        <h2>Service type</h2>
        <h2>Rating: 1.2</h2>
        <h4>Review by: a reviewer</h4>
        <p>Review description. lit sed ullamcorper morbi tincidunt ornare massa eget egestas purus.</p>
      </div>
    </div>
  );
}

export default Review;
