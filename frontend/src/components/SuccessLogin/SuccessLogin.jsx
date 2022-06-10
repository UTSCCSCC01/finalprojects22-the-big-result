import { useEffect, useState } from 'react'
import axios from "axios";
import Logout from "../Logout/Logout";

function SuccessLogin(props) {
  const [profileData, setProfileData] = useState([]);
  
  useEffect(() => {
    axios({
      method: "GET",
      url:"http://localhost:5000/successlogin",
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
    }).then((response) => {
      const res = response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        profile_name: res.first_name,
        about_me: res.last_name, 
        user_type: res.user_type}))
    }).catch((error) => {
      console.log(error)
      // token expired: profile cannot be accessed so reroute to login page
      window.location = "/login"
    })
  }, [])

  return(
    <div>      
      {localStorage.getItem("token") && profileData &&
        <div>
          <p>First name: {profileData.profile_name}</p>
          <p>Last name: {profileData.about_me}</p>
          <p>Type: {profileData.user_type}</p>
          <Logout />
        </div>}
    </div>
  );
}

export default SuccessLogin;