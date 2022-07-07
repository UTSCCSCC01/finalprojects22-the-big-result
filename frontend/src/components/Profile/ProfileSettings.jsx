import {useEffect, useState} from "react";
import axios from "axios";
import "./Profile.css"


function stateHasProfileInfo(state){
    return Object.keys(state).length > 0
}

function ProfileSettings(props){
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/profile/?id=${36}`
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

    const [type, setType] = useState("")

    return (
        <div className="profile-settings">
            {/*<p>{"Hi again!"}</p>*/}
            <p>{stateHasProfileInfo(profileData)?
                <div className="settings-info">
                    {/*<div className="billing-info">*/}
                    {/*    <p>Card Holder Name: {profileData.billingInfo.cardHolderName}</p>*/}
                    {/*    <p>Card number: {profileData.billingInfo.cardNumber}</p>*/}
                    {/*    <p>Card Type: {profileData.billingInfo.cardType}</p>*/}
                    {/*    <p>Date of expiration: {profileData.billingInfo.expiryDate}</p>*/}
                    {/*</div>*/}
                    <div className={"type"}>
                        <button onClick={() => setType("profile")}>Profile</button>
                        <button onClick={() => setType("billing-info")}>Billing Info</button>

                    </div>
                    {type === "profile" && <div>
                        <p>Name: {profileData.fullName}</p>
                        <p>Type of user: {profileData.userType}</p>
                        <p>Email: {profileData.email}</p>
                    </div>}
                    {type === "billing-info" && <div className="billing-info">
                        <p>Card Holder Name: {profileData.billingInfo.cardHolderName}</p>
                        <p>Card number: {profileData.billingInfo.cardNumber}</p>
                        <p>Card Type: {profileData.billingInfo.cardType}</p>
                        <p>Date of expiration: {profileData.billingInfo.expiryDate}</p>
                    </div>}

                </div>: "Doesn't exist :c "}</p>
        </div>
    );

}

export default ProfileSettings