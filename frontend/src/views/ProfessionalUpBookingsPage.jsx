import { useEffect, useState } from "react";

import BookingProfessionalUpcoming from "../components/Bookings/BookingProfessionalUpcoming";
import { getProfessionalUpcomingBookings, useAxiosAuth } from "../APICalls";

function ProfessionalUpBookingsPage() {
  const [bookingsList, setBookingsList] = useState([]);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    axiosAuth
      .get("/users/me")
      .then((res) => {
        getProfessionalUpcomingBookings({
          professionalId: parseInt(res.data.id),
        })
          .then((response) => {
            setBookingsList(response.data.bookings);
          })
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="bookings-page page">
      <h1>Upcoming Bookings</h1>
      <div className="bookings">
        {bookingsList.length!==0 ? bookingsList.map((booking) => (
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
        )) :
        <p className="empty">No upcoming bookings</p>}
      </div>
    </div>
  );
}

export default ProfessionalUpBookingsPage;
