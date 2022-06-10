import { useEffect, useState } from 'react'
import axios from "axios";
import "./Profile.css";
import Review from "../Review/Review";

function Profile(props) {
  const [profileData, setProfileData] = useState([]);
  
  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url: "http://localhost:5000/serviceProvider"
    // }).then(response => {
    //   //console.log(response.data);
    //   setProfileData(response.data);
    // }).catch(error => {
    //   console.log("error", error);
    // })

    // fetch('http://localhost:5000/serviceProvider').then(res => {
    //   console.log(res);
    //   return res.json();
    // }).then(data => {
    //   setProfileData(data.name);
    // });

    fetch('http://localhost:5000/serviceProvider')
      .then(res => res.json())
      .then(data => {
        setProfileData(data);
        
        //console.log(profileData);
        console.log(data);
    });

    

  }, [])

  return(
    <div id="profile">
      <div className="profile-container">
      <h1>Profile</h1>
        <div className="profile-inner-container">
          <div className="img-container">
            <img src={profileData.profilePictureLink} alt=""></img>
            <div className="name-review-container">
              <h2>{profileData.name}</h2>
              <h3>Rating: {profileData.rating}</h3>
            </div>
          </div>

          <div className="description-container">
            <p>{profileData.description}</p>
          </div>
        </div>
      </div>

      <div className="reviews-container">
        <h1>Reviews</h1>
        {Object.keys(profileData).length > 0 && profileData.reviews.length > 0 && (
          <Review imageLink={profileData.reviews[0].imageLink} 
          rating={profileData.reviews[0].rating} reviewDescription={profileData.reviews[0].reviewDescription} 
          reviewedBy={profileData.reviews[0].reviewedBy} service={profileData.reviews[0].service}/>
        )}

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