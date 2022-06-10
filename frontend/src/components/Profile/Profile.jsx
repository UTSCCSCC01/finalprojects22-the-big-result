import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Review from "../Review/Review";

function Profile(props) {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/serviceProvider`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        const res = response.data;
        window.location = "/profile";
        setProfileData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
            <p>Services: {profileData.services}</p>
          </div>
        </div>
      </div>

      <div className="reviews-container">
        <h1>Reviews</h1>
        {Object.keys(profileData).length > 0 &&
          profileData.reviews.length > 0 && (
            <Review
              imageLink={profileData.reviews[0].imageLink}
              rating={profileData.reviews[0].rating}
              reviewDescription={profileData.reviews[0].reviewDescription}
              reviewedBy={profileData.reviews[0].reviewedBy}
              service={profileData.reviews[0].service}
            />
          )}
      </div>
    </div>
  );
}

export default Profile;
