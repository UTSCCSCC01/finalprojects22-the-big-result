import { useEffect, useState } from "react";

import BookingProfessionalCancelled from "../components/Bookings/BookingProfessionalCancelled";
import BookingProfessionalPast from "../components/Bookings/BookingProfessionalPast";
import {
  getProfessionalCancelledBookings,
  getProfessionalPastBookings,
  useAxiosAuth,
} from "../APICalls";

function ProfessionalPastAndCancelledBookingsPage() {
  const [pastBookings, setPastBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    axiosAuth
      .get("/users/me")
      .then((res) => {

        getProfessionalPastBookings({ professionalId: parseInt(res.data.id) })
          .then((response) => {
            setPastBookings(response.data.bookings);
          })
          .catch((err) => console.log(err.response));

        getProfessionalCancelledBookings({
          professionalId: parseInt(res.data.id),
        }).then((response) => {
          setCancelledBookings(response.data.bookings);
        });
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="bookings-page page">
      <h1>Past Bookings</h1>
      <div className="bookings">
        {pastBookings.length!==0 ? pastBookings.map((booking) => (
          <BookingProfessionalPast
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
        <p className="empty">No past bookings</p>}
      </div>
      <h1>Cancelled Bookings</h1>
      <div className="bookings">
        {cancelledBookings.length!==0 ? cancelledBookings.map((booking) => (
          <BookingProfessionalCancelled
            customer={booking.customer}
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

export default ProfessionalPastAndCancelledBookingsPage;
