import { useEffect, useState, useContext } from "react";

import BookingProfessionalCancelled from "../components/Bookings/BookingProfessionalCancelled";
import BookingProfessionalPast from "../components/Bookings/BookingProfessionalPast";
import {
  getProfessionalCancelledBookings,
  getProfessionalPastBookings,
  useAxiosAuth,
} from "../APICalls";
import { AuthContext } from "../context/AuthProvider";

function ProfessionalPastAndCancelledBookingsPage() {
  const [pastBookings, setPastBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    axiosAuth
      .get("/users/me")
      .then((res) => {
        console.log(res.data.id, "finding professional past bookings");

        getProfessionalPastBookings({ professionalId: parseInt(res.data.id) })
          .then((response) => {
            setPastBookings(response.data.bookings);
          })
          .catch((err) => console.log(err.response));

        console.log(res.data.id, "finding professional cancelled bookings...");
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
        {pastBookings.map((booking) => (
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
        ))}
      </div>
      <h1>Cancelled Bookings</h1>
      <div className="bookings">
        {/* TODO (A): no need for location? was not added to past bookings so didnt add to cancelled */}
        {cancelledBookings.map((booking) => (
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
        ))}
      </div>
    </div>
  );
}

export default ProfessionalPastAndCancelledBookingsPage;
