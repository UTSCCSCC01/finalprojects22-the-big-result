
import { useState } from "react";

import EditAvailability from "../components/AvailabilityAndBooking/Professional/EditAvailability";
import ViewAvailability from "../components/AvailabilityAndBooking/Professional/ViewAvailability";

import * as Constants from '../components/AvailabilityAndBooking/Constants'

function ProfessionalAvailability() {
  const [mode, setMode] = useState(Constants.VIEW); 
  
  const getMode = (m) => {
    console.log('got mode...', m); 
    setMode(m);
  }

  // send mode back and forth between parent and children
  return (
    <div>
      {mode===Constants.RECURRING && <EditAvailability sendMode={getMode} mode={Constants.RECURRING}/>}
      {mode===Constants.NONRECURR && <EditAvailability sendMode={getMode} mode={Constants.NONRECURR}/>}
      {mode===Constants.VIEW      && <ViewAvailability sendMode={getMode}/>}
    </div>
  );
}

export default ProfessionalAvailability;
