import { useEffect, useState } from 'react'
import axios from "axios";
import "./Profile.css";
import Review from "../Review/Review";

function Profile(props) {
  const [profileData, setProfileData] = useState(null);

  // useEffect(() => {
  //   // axios({
  //   //   method: "GET",
  //   //   url: "http://localhost:5000/serviceProvider"
  //   // }).then(response => {
  //   //   const res = response.data
  //   //   setProfileData(({
  //   //     profile_name: res.name
  //   //   }))
  //   // })

  //   fetch('http://localhost:5000/serviceProvider').then(res => {
  //     console.log(res);
  //     return res.json();
  //   }).then(data => {
  //     setProfileData(data.name);
  //   });
  // })


  return(
    <div id="profile">
      <h1>Profile</h1>

      <div className="img-container">
        <img src="https://picsum.photos/200" alt=""></img>
        <div className="name-review-container">
          <h2>Name Name</h2>
          <h3>Review: 1.3</h3>
        </div>
      </div>

      <div className="description-container">
        <p>Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>

      <div className="reviews-container">
        <h1>Reviews</h1>
        <Review />

        {/* <div className="review">
          <img src="https://picsum.photos/100"></img>
          <div className="review-text">
            <h2>Service type</h2>
            <h2>Rating: 1.2</h2>
            <h4>Review by: a reviewer</h4>
            <p>Review description. lit sed ullamcorper morbi tincidunt ornare massa eget egestas purus.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Profile;