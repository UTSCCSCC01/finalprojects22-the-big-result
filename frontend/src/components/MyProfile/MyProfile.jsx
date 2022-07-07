import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Logout from "../Logout/Logout";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

function MyProfile(props) {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      axios({
        method: "GET",
        url: "http://localhost:5000/users/me",
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
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
  }, []);

  return (
    <div className="page">
      {user && profileData && (
        <div>
          <p>First name: {profileData.first}</p>
          <p>Last name: {profileData.last}</p>
          <p>Type: {profileData.user_type}</p>
          <Logout />
          <br />
          <Link to="/services">See All Services!</Link>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
