import { useEffect, useState, useContext } from "react";

import BookingProfessionalUpcoming from "../components/Bookings/BookingProfessionalUpcoming";
import { getProfessionalUpcomingBookings, getUsersMe } from "../APICalls"
import { AuthContext } from "../context/AuthProvider";

function ProfessionalUpBookingsPage() {
  const [bookingsList, setBookingsList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      console.log(res.data.id, "id of the customer finding upcoming bookings")
      getProfessionalUpcomingBookings({professionalId: parseInt(res.data.id)})
      // axios({
      //   method: "GET",
      //   url: "http://127.0.0.1:5000/professionalUpcomingBookings",
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