import { useEffect, useState, useContext } from "react";
import BookingCustomerUpcoming from "../components/Bookings/BookingCustomerUpcoming";

import { getCustomerUpcomingBookings, useAxiosAuth } from "../APICalls";
import { AuthContext } from "../context/AuthProvider";

function CustUpBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    axiosAuth
      .get("/users/me")
      .then((res) => {
        getCustomerUpcomingBookings({ customerId: parseInt(res.data.id) })
          .then((response) => {
            setBookings(response.data.bookings);
          })
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
  }, [user]);

  return (
    <div className="bookings-page page">
      <h1>Upcoming Bookings</h1>
      <div className="bookings">
        {bookings.length!==0 ? bookings.map((booking) => (
          <BookingCustomerUpcoming
            id={booking.id}
            providerId = {booking.providerId}
            provider={booking.provider}
            service={booking.service}
            description={booking.description}
            price={booking.price}
            picURL={booking.picURL}
            date={booking.date}
            startTime={booking.startTime}
            endTime={booking.endTime}
            startDateTime={booking.startDateTime}
          />
        )) : 
        <p className="empty">No upcoming bookings</p>}
      </div>
    </div>
  );
}

export default CustUpBookingsPage;
