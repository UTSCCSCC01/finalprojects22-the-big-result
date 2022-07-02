import { useEffect, useState } from "react";
import axios from "axios";

import BookingCustomerPast from "../components/Bookings/BookingCustomerPast";

function CustPastBookingsPage(props) {
  // type = past
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/customerPastBookings",
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
    <div className="bookings-page page">
      <h1>Past Bookings</h1>
      <div className="bookings">
        {bookingsList.map((booking) => (
          <BookingCustomerPast
            provider={booking.provider}
            service={booking.service}
            review={booking.review}
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

export default CustPastBookingsPage;
