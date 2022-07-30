import { useContext, useEffect, useState } from "react";
import Logout from "../Logout/Logout";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useAxiosAuth } from "../../APICalls";
import axios from "axios";
import ProfileEdit from "../Profile/ProfileEdit";

function MyProfile(props) {
  const navigate = useNavigate();
  const axiosAuth = useAxiosAuth();

  const [profileData, setProfileData] = useState([]);
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
    else {

      axiosAuth
      .get("/users/me")
      .then((res) => {
        console.log(res.data.id, "id of the customer finding past bookings");
        setUserId(res.data.id);
        // getProfessional({ customerId: parseInt(res.data.id) })
          axios({
            method: "GET",
            url: `http://127.0.0.1:5000/serviceProvider?id=${res.data.id}`
          })
          .then((response) => {
            console.log(response.data);
            const res = response.data;
            setProfileData(res);
          })
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));





      // axiosAuth
      //   .get("/users/me")
      //   .then((res) => {
      //     setUserId(res.data.id);
      //     console.log(userId + "in set");
      //   })
      //   .catch((err) => console.log(err));

      // axios({
      //   method: "GET",
      //   url: `http://127.0.0.1:5000/serviceProvider?id=${userId}`,
      //   // headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      // })
      //   .then((response) => {
      //     console.log(userId);
      //     console.log(response.data);
      //     const res = response.data;
      //     setProfileData(res);
      //     console.log(response.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });









      // axiosAuth
      //   .get("/users/me")
      //   .then((response) => {
      //     const res = response.data;
      //     res.access_token && props.setToken(res.access_token);
      //     setProfileData({
      //       first: res.first_name,
      //       last: res.last_name,
      //       user_type: res.type,
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     // token expired: profile cannot be accessed so reroute to login page
      //   });
    }
  }, [user]);

  return (
    <div className="page">
      <ProfileEdit
        id={userId}
        profilePictureLink={profileData.profilePictureLink}
        name={profileData.name}
        rating={profileData.rating}
        description={profileData.description}
        services={profileData.services}
        location={profileData.location}
        length={Object.keys(profileData).length}
        reviews={profileData.reviews}
      />
    </div>
  );
}

export default MyProfile;
