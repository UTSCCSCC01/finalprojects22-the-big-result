
import { useState } from "react";

import AvailabilityCalendar from "../components/AvailabilityAndBooking/Customer/AvailabilityCalendar";
import BookingConfirmation from "../components/AvailabilityAndBooking/Customer/BookingConfirmation";


function CustomerBooking() {
  
  const [bookingInfo, setBookingInfo] = useState({});  // booking info passed to confirmation page (booking not yet confirmed)
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false); // default: choosing slot on calendar and not yet confirming
  
  const getBookingInfo = (data) => {
    console.log('got booking info...', data); // for now just a date
    // globalBookingInfo = data;
    setBookingInfo(data);
    setIsConfirmingBooking(true);     
  }

  // send booking info from AvailabilityCalendar to CustomerBooking parent
  // then from CustomerBooking to BookingConfirmation
  return (
    <div>
      {isConfirmingBooking ?  <BookingConfirmation bookingInfo={bookingInfo}/> : 
        <AvailabilityCalendar sendBookingInfo={getBookingInfo}/>}
    </div>
  );
}

export default CustomerBooking;
