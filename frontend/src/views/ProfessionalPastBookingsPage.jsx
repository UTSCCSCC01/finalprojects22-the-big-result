import { useEffect, useState, useContext } from "react";

import BookingProfessionalPast from "../components/Bookings/BookingProfessionalPast";
import { getProfessionalPastBookings, getUsersMe } from '../APICalls'
import { AuthContext } from "../context/AuthProvider";

function ProfessionalPastBookingsPage() {
  const [bookingsList, setBookingsList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      console.log(res.data.id, "id of the customer finding upcoming bookings")
      getProfessionalPastBookings({professionalId: parseInt(res.data.id)})
      // axios({
      //   method: "GET",
      //   url: "http://127.0.0.1:5000/professionalPastBookings",
      //   headers: {
      //     professionalId: 36
      //   }
      // })
      .then((response) => {
        console.log(response.data);
        setBookingsList(response.data.bookings);
      })
      .catch((err) => console.log(err.response));
    }).catch((err) => console.log(err.response));
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
            startTime={booking.startTime}
            endTime={booking.endTime}
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
