import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Logout from "../Logout/Logout";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { useAxiosAuth } from "../../APICalls";

function MyProfile(props) {
  const navigate = useNavigate();
  const axiosAuth = useAxiosAuth();

  const [profileData, setProfileData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      axiosAuth
        .get("/users/me")
        .then((response) => {
          const res = response.data;
          res.access_token && props.setToken(res.access_token);
          setProfileData({
            first: res.first_name,
            last: res.last_name,
            user_type: res.type,
          });
        })
        .catch((error) => {
          console.log(error);
          // token expired: profile cannot be accessed so reroute to login page
        });
    }
  }, [user]);

  return (
    <div className="page">
      {user && profileData && (
        <div>
          <p>First name: {profileData.first}</p>
          <p>Last name: {profileData.last}</p>
          <p>Type: {profileData.user_type}</p>
          <Logout />
        </div>
      )}
    </div>
  );
}

export default MyProfile;
