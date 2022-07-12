import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Profile.css";
import Review from "../Review/Review";
import { getServiceProviderOnId } from "../../APICalls";

function Profile() {
  const [profileData, setProfileData] = useState([]);
  const [serviceSelected, setServiceSelected] = useState(null);
  const { id } = useParams();

  

  useEffect(() => {
    getServiceProviderOnId(`/serviceProvider?id=${id}`, {
      Authorization: "Bearer " + localStorage.getItem("token"),
    })
      .then((response) => {
        const res = response.data;
        setProfileData(res);
        // set default display to first service
        if (res.services.length!==0) {
          setServiceSelected(res.services[0]);
          document.querySelector('#' + res.services[0]).classList.add("service-active");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onServiceSelect = (e, service) => {
    console.log('service clicked:', service);
    e.target.classList.add("service-active");
    setServiceSelected(service); // the id is the service
    // set everything as non active first
    const services = document.querySelectorAll('.service-to-book');
    services.forEach(s => s.classList.remove('service-active'));
    const descriptions = document.querySelectorAll('.service-description');
    descriptions.forEach(d => d.classList.remove('service-active'));
    document.querySelector('#' + service).classList.add("service-active");
    console.log('#' + serviceSelected + "-description");

    var description = document.querySelector('#' + serviceSelected + "-description");
    if (description) // service is already selected
      description.classList.add("hidden");
  }

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
            <p>Choose a service:</p>
            <div className="service-selection">
              <div className="service-options">
                {profileData.services && profileData.services.map((service) => 
                  <p className="service-to-book svc-tag" 
                    id={service} onClick={(e) => onServiceSelect(e, service)}>
                    {service}
                  </p>
                  )}
              </div>
              {serviceSelected &&
                <div className="service-description" id={'#' + serviceSelected+"-description"}>
                  {console.log('here', serviceSelected+"-description")}
                  {profileData.serviceDescriptions[serviceSelected]}
                </div>
              }
            </div>
            

            <Link to={`/c/booking/${id}?service=${serviceSelected}`}>
              <button>Book Now!</button>
            </Link>
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
