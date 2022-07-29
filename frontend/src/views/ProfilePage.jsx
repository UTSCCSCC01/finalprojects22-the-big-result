import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useAxiosAuth } from "../APICalls";
import axios from "axios";

import Profile from "../components/Profile/Profile";
// import ProfileEdit from "../components/Profile/ProfileEdit";

function ProfilePage(props) {
  const [profileData, setProfileData] = useState([]);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/serviceProvider?id=${id}`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => {
        const res = response.data;
        setProfileData(res);
      })
      .catch((err) => {
        console.log(err);
      });

    user &&
      // getUsersMe({
      //   Authorization: `Bearer ${user.access_token}`,
      // })
      axiosAuth
        .get("/users/me")
        .then((res) => {
          setUserId(res.data.id);
        })
        .catch((err) => console.log(err));
  }, []);

  return (
    <Profile
      id={id}
      profilePictureLink={profileData.profilePictureLink}
      name={profileData.name}
      rating={profileData.rating}
      description={profileData.description}
      services={profileData.services}
      location={profileData.location}
      length={Object.keys(profileData).length}
      reviews={profileData.reviews}
    />
  );
}

export default ProfilePage;
