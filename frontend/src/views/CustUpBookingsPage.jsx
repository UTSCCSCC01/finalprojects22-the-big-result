import { useEffect, useState } from "react";
import axios from "axios";

import BookingCustomerUpcoming from "../components/Bookings/BookingCustomerUpcoming";

function CustUpBookingsPage(props) {
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/customerUpcomingBookings",
    })
      .then((response) => {
        const res = response.data;
        setBookingsList(res.bookings);
      })
      .catch((err) => {
        console.log("ERR");
        console.log(err.response);
      });
  }, []);

  return (
    <div className="bookings-page">
      <h1>Upcoming Bookings</h1>
      <div className="bookings">
        {bookingsList.map((booking) => (
          <BookingCustomerUpcoming
            provider={booking.provider}
            service={booking.service}
            description={booking.description}
            cost={booking.cost}
            picURL={booking.picURL}
            date={booking.date}
            time={booking.time}
          />
        ))}
      </div>
    </div>
  );
}

export default CustUpBookingsPage;
