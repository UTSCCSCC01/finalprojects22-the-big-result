import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Profile.css";
import Review from "../Review/Review";
import ServiceInfo from "./ServiceInfo";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProfileEdit(props) {
  const [servicesList, setServicesList] = useState([]);
  const [editForm, setEditForm] = useState({});
  // const [obj, setObj] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location = "/profile/"+props.id;
  }

  const [formOpen, setFormOpen] = useState(false);
  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const [servicesDesc, setServicesDesc] = useState([]) 

  const addToServicesDesc = (newDesc) => {
    return setServicesDesc([...servicesDesc, newDesc])
  }

  const handleFormClose = () => {
    setFormOpen(false);
  };

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
        services: props.services
        // location: "",
      });
    });
  }, [props]);

  const handleSubmit = () => {
    axios({
      // method: "PUT",
      // url: "http://127.0.0.1:5000/serviceProvider",
      // data: {
      //   id: props.id,
      //   profilePictureLink: editForm.profilePictureLink,
      //   description: editForm.description,
      //   services: editForm.services,
      //   // location: editForm.location
      // },
    })
    .then((res) => {
      if (res.data.status == 200){
        setFormOpen(false);
        handleOpen()
      }
      console.log(res.data.status)
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

            <br />

            <p>{props.location}</p>
            {/* <input
              placeholder="Location"
              onChange={handleChange}
              type="text"
              name="location"
              value={editForm.location}
            /> */}
            {/* {console.log(props.services)} */}
            {/* <p className="svc-tag">{props.services}</p> */}
            <div className="svc-tags"> 
            {props.services && props.services.map((svc) => <p className="svc-tag">{svc}</p>)}
            </div>

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

            <button onClick={handleFormOpen}>Edit Profile</button>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="title"
      >
        <Box sx={style}>
          <Typography id="title" variant="h6" component="h2">
            Success!
          </Typography>
          <Typography id="description" sx={{ mt: 2 }}>
            Your profile has been updated.
          </Typography>
        </Box>
      </Modal>
      
      <Dialog open={formOpen} onClose={handleFormClose} scroll='paper'>
        <DialogTitle>Enter Additional Information For Services</DialogTitle>
          {editForm.services && editForm.services.map((arg) => (<ServiceInfo addToServicesDesc={addToServicesDesc} service={arg}/>))}
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileEdit;
