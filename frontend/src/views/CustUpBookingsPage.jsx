import { useEffect, useState, useContext } from "react";
import BookingCustomerUpcoming from "../components/Bookings/BookingCustomerUpcoming";

import { getCustomerUpcomingBookings, getUsersMe } from "../APICalls"
import { AuthContext } from "../context/AuthProvider";

function CustUpBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // get current user id 
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      console.log(res.data.id, "id of the customer finding upcoming bookings")
      getCustomerUpcomingBookings({customerId: parseInt(res.data.id)})
      .then((response) => {
        console.log(response.data);
        setBookings(response.data.bookings);
        console.log(bookings)
      })
      .catch((err) => console.log(err));
    }).catch((err) => console.log(err));
  }, []);

  return (
    <div className="bookings-page page">
      <h1>Upcoming Bookings</h1>
      <div className="bookings">
        {bookings.map((booking) => (
          <BookingCustomerUpcoming
            id={booking.id}
            providerId = {booking.providerId}
            provider={booking.provider}
            service={booking.service}
            description={booking.description}
            cost={booking.cost}
            picURL={booking.picURL}
            date={booking.date}
            startTime={booking.startTime}
            endTime={booking.endTime}
            startDateTime={booking.startDateTime}
          />
        ))}
      </div>
    </div>
  );
}

export default CustUpBookingsPage;
