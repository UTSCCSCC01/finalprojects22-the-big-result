import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Review from "../Review/Review";

function Profile(props) {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/serviceProvider/`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        const res = response.data;
        setProfileData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="profile" className="page">
      <div className="profile-container">
        <div className="profile-inner-container">
          <div className="img-container">
            <img
              className="profile-img"
              src={profileData.profilePictureLink}
              alt=""
            ></img>
          </div>

          <div className="description-container">
            <div className="name-review-container">
              <h1 className="highlight">{profileData.name}</h1>
              <h3>Rating: {profileData.rating}</h3>
            </div>
            <p>{profileData.description}</p>
            <p className="svc-tag">{profileData.services}</p>
            <button>Book Now!</button>
          </div>
        </div>
      </div>
      <br />
      <div className="reviews-container">
        <h1>Reviews</h1>
        {Object.keys(profileData).length > 0 &&
          profileData.reviews.length > 0 &&
          profileData.reviews.map((review) => (
            <Review
              imageLink={review.imageLink}
              rating={review.rating}
              reviewDescription={review.reviewDescription}
              reviewedBy={review.reviewedBy}
              service={review.service}
            />
          ))}
        <br />
        <button>See All Reviews </button>
      </div>
    </div>
  );
}

export default Profile;
