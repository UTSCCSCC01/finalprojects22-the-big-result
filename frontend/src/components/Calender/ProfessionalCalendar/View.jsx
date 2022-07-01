import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import * as EvFn from "./EventActions";
import * as Constants from './Constants'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../Calender.css';

import axios from "axios";
import moment from "moment";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);



function View() {
  const [viewAvailabilities, setViewAvailabilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));

  useEffect(() => {
    axios({
      method: "GET", url: `http://localhost:5000/getAvailability`,
      data: { professionalId: "01", start: EvFn.getDateFromDateTime(viewDate) } // make sure valid prof id
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(new Date());
        let resFormatted = EvFn.formatGETAvailabilitiesData(res, sundayOfCurrWeek);
        setViewAvailabilities(EvFn.recurrEvents(resFormatted, 4)); // TODO read TODO below: instead of repeating get availability for this week
      }).catch((err) => console.log(err));
      
    axios({
      method: "GET", url: `http://localhost:5000/getBookings`,
      data: { professionalId: "01"} // make sure valid prof id
    }).then((res) => {
        const resFormatted = res.data.map((r) => {
          return { ...r, 
            start: moment(r.start, 'YYYY-MM-DD HH:mm:ss').toDate(), 
            end: moment(r.end, 'YYYY-MM-DD HH:mm:ss').toDate(),
            title: Constants.BOOKING,  
            color: Constants.BOOKING_COLOR}
        })
        setBookings(resFormatted);
      }).catch((err) => console.log(err));
  }, []);


  const onNavigate =(date, view) => {
    console.log('navigating to...', date, view);
    setViewDate(EvFn.getSunday(date)); // TODO TODO TODO TODO: use viewDate to send request for getAvailability 
  }


  // setEventsToRecurr(viewAvailabilities) resets the recurr view if not submitting  
  return (
    <div>
      <div>
        <h2>View mode.</h2>
        <p>Edit your availability:</p>
        <button className="tab" onClick={() => {window.location = "/p/calendar/edit/recurr"}}>Recurring.</button>
        <button className="tab" onClick={() => {window.location = "/p/calendar/edit/non-recurr"}}>Non-recurring</button>
        <div className="prof-calender">
          <Calendar
            views={["week", "day"]}
            localizer={localizer}
            defaultDate={new Date()} 
            defaultView="week"
            events={EvFn.concatEvents(viewAvailabilities, bookings)} 
            style={{ height: "100vh" }}
            eventPropGetter={(EvFn.eventStyleGetter)}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
}
// NOTE: only see their recurring events when changing them ,no bookigns, bookings only appear in the view tab

export default View;