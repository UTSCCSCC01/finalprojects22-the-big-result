import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

import Profile from "../components/Profile/Profile";
import ProfileEdit from "../components/Profile/ProfileEdit";

function ProfilePage(props) {
  const [profileData, setProfileData] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/serviceProvider?id=${id}`,
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
    <ProfileEdit 
      profilePictureLink={profileData.profilePictureLink}
      name={profileData.name}
      rating={profileData.rating}
      description={profileData.description}
      services={profileData.services}
      length={Object.keys(profileData).length}
      reviews={profileData.reviews}
    />
  );
}

export default ProfilePage;
