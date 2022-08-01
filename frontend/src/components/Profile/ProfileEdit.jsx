import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Profile.css";
import Review from "../Review/Review";
import ServiceInfo from "./ServiceInfo";
import { useParams, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {useAxiosAuth} from "../../APICalls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "400px",
  padding: "20px",
  border: "2px solid black",
  p: 4,
};

const uploadImage = async (file,userid) => {
    try {
        console.log("Upload Image", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userid",userid);
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        const API = "upload";
        const HOST = "http://localhost:5000";
        const url = `${HOST}/${API}`;

        const result = await axios.post(url, formData, config);
        console.log("Result: ", result);


    } catch (error) {
        console.error(error);
    }
};

function ProfileEdit(props) {
  const axiosAuth = useAxiosAuth();

  const [servicesList, setServicesList] = useState([]);
  const [origServices, setOrigServices] = useState([]);
  const [editForm, setEditForm] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [formOpen, setFormOpen] = useState(false);
  const [servicesDesc, setServicesDesc] = useState([]);

  const handleFormOpen = () => {
    setFormOpen(true);
    //Set the initial values for the services selected
    let servicesOffered = [];
    editForm.services.forEach((svc) => {
      servicesOffered.push({ service: svc, desc: "", price: 0 });
    });
    setServicesDesc(servicesOffered);
  };

  //Onchange to any of the new forms, update the servicesOffered descriptions and prices as required
  const addToServicesDesc = (newDesc) => {
    let newServicesDesc = [];
    servicesDesc.forEach((desc) => {
      if (desc.service !== newDesc.service) {
        newServicesDesc.push(desc);
      } else newServicesDesc.push(newDesc);
    });
    setServicesDesc(newServicesDesc);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const [image, setImage] = useState("");


  useEffect(() => {
    // axiosAuth
    //   .get(`/getphoto`)
    //   .then((response) => {
    //     const res = response.data;
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axiosAuth.get(`/getProfilePicture`, {
      responseType: "arraybuffer"
    })
    .then((res) => {
    const base64 = btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    setImage(base64)
  })

    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/getServices`,
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
        // location: "",
      });
      setOrigServices(props.services);
    });
  }, [props]);

  const handleSubmit = () => {
    axios({
      method: "PUT",
      url: "http://127.0.0.1:5000/serviceProvider",
      data: {
        id: props.id,
        profilePictureLink: editForm.profilePictureLink,
        description: editForm.description,
        services: editForm.services,
        servicesDesc: servicesDesc,
        // location: editForm.location
      },
    })
      .then((res) => {
        if (res.data.status === 200) {
          setFormOpen(false);
          handleOpen();
        }
        console.log(res.data.status);
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

  const getServices = () => {
    let finalServices = [];
    editForm.services.forEach((element) => {
      if (!origServices.includes(element)) {
        finalServices.push(element);
      }
    });
    return finalServices;
  };

    const [file, setFile] = useState(null);


    const handleFile = (e) => {
      let file = e.target.files[0];
        // this.setState({ file });
      setFile(file);
      // const fileURL = URL.createObjectURL(file)
      // const base64 = getBase64StringFromDataURL(fileURL);
      // setImage(base64);

    }
    const handleUpload = async (e) => {
        console.log(file);
        await uploadImage(file, props.id);

    }

  return (
    <div id="profile" className="page">
      <div className="profile-container">
        <div className="profile-inner-container">
          <div className="img-container">
            {/*<img*/}
            {/*  className="profile-img"*/}
            {/*  src={props.profilePictureLink}*/}
            {/*  alt=""*/}
            {/*/>*/}
            <img src={`data:;base64,${image}`} alt={""} />
            {/*<input*/}
            {/*  onChange={handleChange}*/}
            {/*  placeholder="Profile Picture Link"*/}
            {/*  type="text"*/}
            {/*  name="profilePictureLink"*/}
            {/*  value={editForm.profilePictureLink}*/}
            {/*/>*/}
            <input type="file" name="file" accept="image/*" onChange={e => handleFile(e)} />
            <button onClick={e => {handleUpload(e);}}>Upload</button>

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
              {editForm.services &&
                editForm.services.map((svc) => (
                  <p className="svc-tag">{svc}</p>
                ))}
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

            <button onClick={handleFormOpen}>Confirm Choices</button>
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
        <Link to={`/getAllReviews/${props.id}`}>
          <button >See All Reviews </button>
        </Link>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="title">
        <Box sx={style}>
          <Typography id="title" variant="h6" component="h2">
            Success!
          </Typography>
          <Typography id="description" sx={{ mt: 2 }}>
            Your profile has been updated.
          </Typography>
        </Box>
      </Modal>

      <Dialog open={formOpen} onClose={handleFormClose} scroll="paper">
        <DialogTitle>Enter Additional Information For Services</DialogTitle>
        {editForm.services &&
          origServices &&
          getServices().map((arg) => (
            <ServiceInfo addToServicesDesc={addToServicesDesc} service={arg} />
          ))}
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileEdit;
