import { useEffect, useState } from "react";
import axios from "axios";

import BookingProfessionalUpcoming from "../components/Bookings/BookingProfessionalUpcoming";

function ProfessionalUpBookingsPage(props) {
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/professionalUpcomingBookings",
      headers: {
        professionalId: 36
      }
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
      <h1>Upcoming Bookings</h1>
      <div className="bookings">
        {bookingsList.map((booking) => (
          <BookingProfessionalUpcoming
            customer={booking.customer}
            service={booking.service}
            date={booking.date}
            startTime={booking.startTime}
            endTime={booking.endTime}
            location={booking.location}
            price={booking.price}
            picURL={booking.picURL}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfessionalUpBookingsPage;