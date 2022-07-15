import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Profile.css"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {useAxiosAuth} from "../../APICalls";


function ProfileSettings(props){
    const [profileData, setProfileData] = useState({});
    const axiosAuth = useAxiosAuth();


    useEffect(() => {
        axiosAuth.get(`/profile/`)
            .then((response) => {
        const res = response.data;
        setProfileData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios({
    //   method: "GET",
    //   url: `http://127.0.0.1:5000/profile/?id=${36}`,
    //
    // })
    //   .then((response) => {
    //     const res = response.data;
    //     setProfileData(res);
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    }, []);

    const [type, setType] = useState("profile");

  const handleButtonClick = (event, type) =>{
      if(type !== null){
          setType(type);
      }
  };

    return (
        <div className="profile-settings">
            <div className="button-selection">
                <ToggleButtonGroup
                    color="primary"
                    value={type}
                    exclusive
                    onChange={handleButtonClick}
                >
                    <ToggleButton value="profile">Profile</ToggleButton>
                    <ToggleButton value="billing-info">Billing</ToggleButton>

                </ToggleButtonGroup>
            </div>
            <p>{profileData?
                <div className="settings-info">

                    {type === "profile" && <div>
                        <p>Name: {profileData.fullName}</p>
                        <p>Type of user: {profileData.userType}</p>
                        <p>Email: {profileData.email}</p>
                    </div>}
                    {type === "billing-info" && <div className="billing-info">
                        <p> Card Holder Name: {profileData.billingInfo.cardHolderName}</p>
                        <p>Card number: {profileData.billingInfo.cardNumber}</p>
                        <p>Card Type: {profileData.billingInfo.cardType}</p>
                        <p>Date of expiration: {profileData.billingInfo.expiryDate}</p>
                    </div>}

                </div>: "Loading ..."}</p>
        </div>
    );
}

export default ProfileSettings