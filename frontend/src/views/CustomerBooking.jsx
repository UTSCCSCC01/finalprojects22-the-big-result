
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
  const { profId } = useParams();
  // for now 
  const [bookingInfo, setBookingInfo] = useState({});  // booking info passed to confirmation page (booking not yet confirmed)
  console.log('selected service: ', searchParams.get("service")) 
  
  // get id of customer
  useEffect(() => {
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      setId(res.data.id);
      console.log('id of customer and professional id:', res, profId);
      setId(res.data.id);

      setBookingInfo({
        service: searchParams.get("service"),
        professionalId: profId,
        customerId: res.data.id

      })
      
    }).catch((error) => {
      console.log(error); // token not valid? 
    });

    console.log("current booking info", bookingInfo);

  }, []);

  const getBookingInfo = (data) => {
    console.log('got booking info...', data); // for now just a date

    // TODO add rest of booking data you get from availabilityCalender to bookingInfo
    console.log(bookingInfo, "HERE")
    
    // concatenate all the data and bookingInfo 
    let res = {};
    Object.keys(bookingInfo).forEach((b) => res[b]=bookingInfo[b]);
    Object.keys(data).forEach((d) => res[d]=data[d]);
    console.log('res after concatenating booking info...', res);
    setBookingInfo(res);

    setIsConfirmingBooking(true);     
    console.log("BOOKING INFO", bookingInfo);
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
          sendBookingInfo={getBookingInfo}/>}
    </div>
  );
}

export default CustomerBooking;
