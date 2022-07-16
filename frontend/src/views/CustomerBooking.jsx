
import { useState, useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import AvailabilityCalendar from "../components/AvailabilityAndBooking/Customer/AvailabilityCalendar";
import BookingConfirmation from "../components/AvailabilityAndBooking/Customer/BookingConfirmation";
import { getUsersMe } from "../APICalls"
import { AuthContext } from "../context/AuthProvider";

function CustomerBooking() {
  const [searchParams, setSearchParams] = useSearchParams({});
  
  const [isConfirmingBooking, setIsConfirmingBooking] = useState(false); // default: choosing slot on calendar and not yet confirming
  const [id, setId] = useState(null);
  const { user } = useContext(AuthContext);
  const { profId, oldBookingId } = useParams();
  // for now 
  const [bookingInfo, setBookingInfo] = useState({});  // booking info passed to confirmation page (booking not yet confirmed)
  
  // >>>
  // check all info passed is passed correctly
  // http://localhost:3000/c/booking/36?reschedule=1&id=74&cost=55&service=babysitting&providerName=provider%20one
  console.log('selected service: ', searchParams.get("reschedule"),searchParams.get("id"), searchParams.get("cost"), searchParams.get("service"), searchParams.get("providerName"))
  // <<<
  
  // get id of customer
  useEffect(() => {
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      setId(res.data.id);
      setId(res.data.id);

      setBookingInfo({
        // >>>
        // extra parameters you needed for rescheduling:
        id: searchParams.get("id"), // id of booking to cancel if they reschedule
        reschedule: searchParams.get("reschedule"), // is 1 if rescheudling
        // <<<
        
        service: searchParams.get("service"),
        cost: searchParams.get("cost"),
        providerName: searchParams.get("providerName"),
        professionalId: profId,
        prevBookingId: oldBookingId,
        customerId: res.data.id
      })
    }).catch((error) => {
      console.log(error); // token not valid? 
    });

    console.log("current booking info", bookingInfo);

  }, []);

  const getBookingInfo = (data) => {
    console.log('got booking info...', data); // for now just a date    
    // concatenate all the data and bookingInfo 
    let res = {};
    Object.keys(bookingInfo).forEach((b) => res[b]=bookingInfo[b]);
    Object.keys(data).forEach((d) => res[d]=data[d]);
    setBookingInfo(res);

    setIsConfirmingBooking(true);     
  }

  // send booking info from AvailabilityCalendar to CustomerBooking parent
  // then from CustomerBooking to BookingConfirmation
  return (
    <div>
      {isConfirmingBooking ?  
        <BookingConfirmation 
          bookingInfo={bookingInfo}/> : 
        <AvailabilityCalendar 
          profId={profId}  // need profId to get availability
          oldBookingId={oldBookingId}
          sendBookingInfo={getBookingInfo}/>}
    </div>
  );
}

export default CustomerBooking;
