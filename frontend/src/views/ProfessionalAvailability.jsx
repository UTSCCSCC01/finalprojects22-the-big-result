import { useState, useContext, useEffect } from "react";

import EditAvailability from "../components/AvailabilityAndBooking/Professional/EditAvailability";
import ViewAvailability from "../components/AvailabilityAndBooking/Professional/ViewAvailability";
import * as Constants from "../components/AvailabilityAndBooking/Constants";
import { getUsersMe, useAxiosAuth } from "../APICalls";
import { AuthContext } from "../context/AuthProvider";

function ProfessionalAvailability() {
  const [mode, setMode] = useState(Constants.VIEW);
  const [id, setId] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosAuth = useAxiosAuth();

  // get user id
  useEffect(() => {
    // getUsersMe({
    //   Authorization: `Bearer ${user.access_token}`,
    // })
    axiosAuth
      .get("/users/me")
      .then((res) => {
        setId(res.data.id);
        console.log('id of professional', res.data.id);
      })
      .catch((error) => {
        console.log(error); // token not valid?
      });
  }, []);
  
  const getMode = (m) => {
    console.log("got mode...", m);
    setMode(m);
  };

  // send mode back and forth between parent and children
  return (
    <div>
      {mode === Constants.RECURRING && id && (
        <EditAvailability
          id={id}
          sendMode={getMode}
          mode={Constants.RECURRING}
        />
      )}
      {mode === Constants.NONRECURR && id && (
        <EditAvailability
          id={id}
          sendMode={getMode}
          mode={Constants.NONRECURR}
        />
      )}
      {mode === Constants.VIEW && id && (
        <ViewAvailability id={id} sendMode={getMode} />
      )}
    </div>
  );
}

export default ProfessionalAvailability;
