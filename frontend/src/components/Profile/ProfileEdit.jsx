import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import "./Profile.css";
import Review from "../Review/Review";

function ProfileEdit(props) {
  const [servicesList, setServicesList] = useState([]);
  const [editForm, setEditForm] = useState({});

  console.log(props);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/services-list`,
    }).then((res) => {
      let services = [];
      res.data.services.forEach((element) =>
        services.push({
          label: element.service,
          value: element.service.toLowerCase(),
        })
      );
      setServicesList(services);
      setEditForm({
        profilePictureLink: props.profilePictureLink,
        description: props.description,
        services: props.services,
        location: "",
      });
    });
  }, [props]);

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/editProfile",
      data: {
        id: props.id,
        profilePictureLink: editForm.profilePictureLink,
        description: editForm.description,
        services: editForm.services,
        // location: editForm/location
      },
    })
      .then((res) => {
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    setEditForm((prev) => ({
      ...prev,
      services: Array.isArray(e) ? e.map((option) => option.value) : [],
    }));
  };

  return (
    <div id="profile" className="page">
      <div className="profile-container">
        <div className="profile-inner-container">
          <div className="img-container">
            <img
              className="profile-img"
              src={props.profilePictureLink}
              alt=""
            ></img>
            <input
              onChange={handleChange}
              placeholder="Profile Picture Link"
              type="text"
              name="profilePictureLink"
              value={editForm.profilePictureLink}
            />
          </div>

          <div className="description-container">
            <div className="name-review-container">
              <h1 className="highlight">{props.name}</h1>
              <h3>Rating: {props.rating}</h3>
            </div>
            {/* <p>{props.description}</p> */}
            <textarea
              placeholder="Description"
              onChange={handleChange}
              name="description"
              value={editForm.description}
              rows="5"
              cols="70"
            />
            <br /> <br />
            <input
              placeholder="Location"
              onChange={handleChange}
              type="text"
              name="location"
              value={editForm.location}
            />
            <p className="svc-tag">{props.services}</p>
            {servicesList && editForm.services && (
              <Select
                placeholder="Services"
                value={servicesList.filter((option) =>
                  editForm.services.includes(option.value)
                )}
                onChange={handleSelect}
                isMulti
                isClearable
                options={servicesList}
              />
            )}
            <br />
            <div className="btn-group">
              <button onClick={handleSubmit}>Edit Profile</button>
              <button>Edit Calendar</button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="reviews-container">
        <h1>Reviews</h1>
        {props.length > 0 &&
          props.reviews.length > 0 &&
          props.reviews.map((review) => (
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

export default ProfileEdit;
