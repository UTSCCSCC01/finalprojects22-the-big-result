
import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import AvailabilityCalendar from "../components/AvailabilityAndBooking/Customer/AvailabilityCalendar";
import BookingConfirmation from "../components/AvailabilityAndBooking/Customer/BookingConfirmation";
import { getUsersMe } from "../APICalls"
import { AuthContext } from "../context/AuthProvider";

function CustomerBooking() {
  
  const [bookingInfo, setBookingInfo] = useState({});  // booking info passed to confirmation page (booking not yet confirmed)
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false); // default: choosing slot on calendar and not yet confirming
  const [id, setId] = useState(null);
  const { user } = useContext(AuthContext);
  const { profId } = useParams();
  
  // get id of customer
  useEffect(() => {
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      setId(res.data.id);
      console.log('id of customer and professional id:', res.data.id, profId);
      setId(res.data.id);
      // console.log("id of customer:", res.data.id);
    }).catch((error) => {
      console.log(error); // token not valid? 
    });
  }, []);

  const getBookingInfo = (data) => {
    console.log('got booking info...', data); // for now just a date
    setBookingInfo(data);
    setIsConfirmingBooking(true);     
    console.log("BOOKING INFO", bookingInfo);
  }

  // send booking info from AvailabilityCalendar to CustomerBooking parent
  // then from CustomerBooking to BookingConfirmation
  return (
    <div>
      {isConfirmingBooking ?  <BookingConfirmation bookingInfo={bookingInfo}/> : 
        <AvailabilityCalendar id={id} profId={profId} sendBookingInfo={getBookingInfo}/>}
    </div>
  );
}

export default CustomerBooking;
