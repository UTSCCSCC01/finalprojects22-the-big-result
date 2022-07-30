
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../Calender.css';

import * as EvFn from "../EventActions";
import * as Constants from '../Constants'
import { getAvailability } from "../../../APICalls"

import moment from "moment";

moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const today = new Date();


function AvailabilityCalendar({ profId, oldBookingId, sendBookingInfo }) {
  const [viewAvailabilities, setViewAvailabilities] = useState([]);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));
  
  useEffect(() => {
    getAvailability({ 
      professionalId: parseInt(profId), 
      start: EvFn.getDateFromDateTime(viewDate),
      type: 'customer',
    }).then((res) => {
       let sundayOfCurrWeek = EvFn.getSunday(viewDate);
       let resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.AVAILABILITY);
       let resFormatted2 = EvFn.removePastEvents(resFormatted);  
       setViewAvailabilities(resFormatted2); 
     }).catch((err) => console.log(err));
 }, []);

 const handleSelectEvent = (event) => {
    // send booking info back to parent
    sendBookingInfo({ 
      professionalId: profId,
      prevBookingId: oldBookingId,

      start: EvFn.getTimeFromDateTime(event.start),
      end: EvFn.getTimeFromDateTime(event.end),
      date: EvFn.getDateFromDateTime(event.start),
      // NOTE: instructions is set in the Confirmation page
      // NOTE: the price, location, serviceName is filled in the backend by using the professionalId passed
    });
  }

  const onNavigate =(date, view) => {
    getAvailability({ 
      professionalId: profId, 
      start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
      type: 'customer'
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        let resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.AVAILABILITY);
        let resFormatted2 = EvFn.removePastEvents(resFormatted); 
        setViewAvailabilities(resFormatted2); 
      }).catch((err) => console.log(err));
    setViewDate(new Date(EvFn.getSunday(date) - 7)); 
  }

  return (
    <div>
      <div>
        <h2>Choosing a booking time.</h2>
        <div className="prof-calender">
          <Calendar
            views={["week", "day"]}
            localizer={localizer}
            defaultDate={new Date()} 
            defaultView="week"
            events={viewAvailabilities} 
            style={{ height: "100vh" }}
            eventPropGetter={(EvFn.eventStyleGetter)}
            onNavigate={onNavigate}
            onSelectEvent={handleSelectEvent}
            min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)}
            max={new Date(today.getFullYear()+1, today.getMonth(), today.getDate(), 22)}
          />
        </div>
      </div>
    </div>
  );
}

export default AvailabilityCalendar;