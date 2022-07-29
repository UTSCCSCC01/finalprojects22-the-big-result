import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import {
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useAxiosAuth } from "../../APICalls";
import { AuthContext } from "../../context/AuthProvider";

function ProfileSettings() {
  const [profileData, setProfileData] = useState({});
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const axiosAuth = useAxiosAuth();

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosAuth
      .get(`/profile/`)
      .then((response) => {
        const res = response.data;
        setProfileData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [type, setType] = useState("profile");

  const handleButtonClick = (event, type) => {
    if (type !== null) {
      setType(type);
    }
  };

  const confirmDeactivation = () => {
    axiosAuth
      .get("/users/me")
      .then((res) => res.data.id)
      .then((id) => {
        axiosAuth
          .delete(`/provider`, { data: { id: id } })
          .then(() => {
            setOpenConfirmation(false);
            //user should be logged out and removed from db
            setUser(null);
            navigate("/deactivated");
          })
          .catch((err) => {
            console.log(err);
          });
      });
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
      <p>
        {profileData ? (
          <div className="settings-info">
            {type === "profile" && (
              <div>
                <p>Name: {profileData.fullName}</p>
                <p>Type of user: {profileData.userType}</p>
                <p>Email: {profileData.email}</p>
              </div>
            )}
            {type === "billing-info" && (
              <div className="billing-info">
                <p>
                  Card Holder Name: {profileData.billingInfo.cardHolderName}
                </p>
                <p>Card number: {profileData.billingInfo.cardNumber}</p>
                <p>Card Type: {profileData.billingInfo.cardType}</p>
                <p>Date of expiration: {profileData.billingInfo.expiryDate}</p>
              </div>
            )}

            <br />
            <br />
            {user && user.type === "provider" && (
              <>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenConfirmation(true)}
                >
                  Deactivate Your Account
                </Button>
                <Dialog
                  open={openConfirmation}
                  onClose={() => setOpenConfirmation(false)}
                >
                  <DialogTitle className="error">
                    {"Are you sure you want to deactivate your account?"}
                  </DialogTitle>
                  <DialogContent>
                    <p>
                      Deactivating your account will remove you as a service
                      provider and your services will no longer be shown to
                      Amorr customers.
                    </p>
                    <p>
                      If you wish to reactivate, you must go through the
                      approval process once again.
                    </p>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => setOpenConfirmation(false)}
                    >
                      Take Me Back
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => confirmDeactivation()}
                      autoFocus
                    >
                      Deactivate My Account
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </div>
        ) : (
          "Loading ..."
        )}
      </p>
    </div>
  );
}

export default ProfileSettings;
