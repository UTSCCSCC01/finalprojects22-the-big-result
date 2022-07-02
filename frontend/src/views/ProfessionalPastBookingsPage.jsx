import { useEffect, useState } from "react";
import axios from "axios";

import BookingProfessionalPast from "../components/Bookings/BookingProfessionalPast";

function ProfessionalPastBookingsPage(props) {
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/professionalPastBookings",
    })
      .then((response) => {
        const res = response.data;
        setBookingsList(res.bookings);
      })
      .catch((err) => {
        console.log("ERR");
        console.log(err.response);
      })
  }, []);

  return(
    <div className="bookings-page page">
      <h1>Past Bookings</h1>
      <div className="bookings">
        {bookingsList.map((booking) => (
          <BookingProfessionalPast
            customer={booking.customer}
            service={booking.service}
            date={booking.date}
            time={booking.time}
            location={booking.location}
            price={booking.price}
            picURL={booking.picURL}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfessionalPastBookingsPage;
