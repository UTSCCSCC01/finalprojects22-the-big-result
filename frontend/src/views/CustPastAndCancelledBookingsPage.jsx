import { useEffect, useState, useContext } from "react";

import BookingCustomerPast from "../components/Bookings/BookingCustomerPast";
import BookingCustomerCancelled from "../components/Bookings/BookingCustomerCancelled"
import { getCustomerPastBookings, getUsersMe, getCustomerCancelledBookings } from "../APICalls"
import { AuthContext } from "../context/AuthProvider";

function CustPastAndCancelledBookingsPage() {
  const [pastBookings, setPastBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      getCustomerPastBookings({customerId: parseInt(res.data.id)})
      .then((response) => {
        setPastBookings(response.data.bookings);
      })
      .catch((err) => console.log(err.response));
      getCustomerCancelledBookings({customerId: parseInt(res.data.id)})
      .then((response) => {
        setCancelledBookings(response.data.bookings);
      })

    }).catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="bookings-page page">
      <h1>Past Bookings</h1>
      <div className="bookings">
        {pastBookings.length!==0 ? pastBookings.map((booking) => (
          <BookingCustomerPast
            bookingId={booking.id}
            providerId={booking.providerId}
            provider={booking.provider}
            service={booking.service}
            review={booking.review}
            cost={booking.cost}
            picURL={booking.picURL}
            date={booking.date}
            startTime={booking.startTime}
            endTime={booking.endTime}
            location={booking.location}
            price={booking.price}
          />
        )) :
        <p className="empty">No past bookings</p>}
      </div>
      <h1>Cancelled Bookings</h1>
      <div className="bookings">
        {cancelledBookings.length!==0 ? cancelledBookings.map((booking) => (
          <BookingCustomerCancelled
            provider={booking.provider}
            service={booking.service}
            cost={booking.cost}
            picURL={booking.picURL}
            date={booking.date}
            startTime={booking.startTime}
            endTime={booking.endTime}
            location={booking.location}
            price={booking.price}
          />
        )) :
        <p className="empty">No cancelled bookings</p>}
      </div>
    </div>
  );
}

export default CustPastAndCancelledBookingsPage;
