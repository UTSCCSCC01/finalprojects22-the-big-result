import { useEffect, useState } from 'react'
import axios from "axios";
import Logout from '../Logout/Logout'

function Profile(props) {
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    // protected endpoint with authentication
    axios({
      method: "GET",
      url:"http://localhost:5000/profile", //full path since proxy doesnt work-keeps acessing localhost 3000 
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
    }).then((response) => {
      const res = response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        profile_name: res.first_name,
        about_me: res.last_name}))
    }).catch((error) => {
      console.log(error.response.status)
      // token expired: profile cannot be accessed so reroute to login page
      window.location = "/login"
      // TODO: also take into account case that user doesn't exist
    })
  })

  return (

    <div>      
      {localStorage.getItem("token") && profileData &&
        <div>
          <p>First name: {profileData.profile_name}</p>
          <p>Last name: {profileData.about_me}</p>
          <Logout />
        </div>}
    </div>
  );
}

export default Profile;