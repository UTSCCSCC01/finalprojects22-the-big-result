import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import {eventStyleGetter, recurrEvents, getTimeFromDate, concatEvents} from "./EventActions";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../Calender.css';

import axios from "axios";
import moment from "moment";


moment.locale("en-GB", {week: {dow: 1, doy: 1,}});
const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

// constants
const RECURRING = "RECURRING";
const NONRECURR = "NON-RECURRING";
const VIEW = "VIEW";
const BOOKING = "BOOKING"
const AVAILABILITY = "AVAILABILITY"
const BOOKING_COLOR = "C20232"
const AVAIL_COLOR = "7E0080"


function ProfCalender() {
  // todo: change name from events to availability
  const [eventsToRecurr, setEventsToRecurr] = useState([]); // events for one week that will recurr
  const [nonRecurrEvents, setNonRecurrEvents] = useState([]);
  const [allAvailabililties, setAllAvailabililties] = useState([]); // todo repeat eventsToRecurr 4 times for a month from todays day
  const [bookings, setBookings] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // both bookings and availabilities
  const [mode, setMode] = useState(VIEW);


  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/getRecurrAvailability`,
      data: { professionalId: "01"} // make sure valid prof id

    }).then((res) => {
        const res_formatted = res.data.map((r) => {
          return { ...r, 
            start: moment(r.start, 'YYYY-MM-DD HH:mm:ss').toDate(), 
            end: moment(r.end, 'YYYY-MM-DD HH:mm:ss').toDate(),
            title: AVAILABILITY, 
            color: AVAIL_COLOR}
        })
        setEventsToRecurr(res_formatted);
        setAllAvailabililties(recurrEvents(res_formatted, 4));

      }).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/getNonRecurrAvailability`,

    }).then((res) => {
        const res_formatted = res.data.map((r) => {
          return { ...r, 
            start: moment(r.start, 'YYYY-MM-DD HH:mm:ss').toDate(), 
            end: moment(r.end, 'YYYY-MM-DD HH:mm:ss').toDate(),
            title: AVAILABILITY,  
            color: AVAIL_COLOR}
        })
        setNonRecurrEvents(res_formatted);

      }).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/getBookings`,

    }).then((res) => {
        const res_formatted = res.data.map((r) => {
          return { ...r, 
            start: moment(r.start, 'YYYY-MM-DD HH:mm:ss').toDate(), 
            end: moment(r.end, 'YYYY-MM-DD HH:mm:ss').toDate(),
            title: BOOKING,  
            color: BOOKING_COLOR}
        })
        setBookings(res_formatted);

      }).catch((err) => console.log(err));
  }, []);
    

  const handleSelect = ({ start, end }) => {
    console.log("selecting event ...");

    // new: duplicate the event for the next 4 weeks? (set a default)
    // const month = start.getDay(); # gets day of the week
    
    setEventsToRecurr([
        ...eventsToRecurr,
        { start: start, 
          end:end, 
          title:AVAILABILITY, 
          color: AVAIL_COLOR,
          id:eventsToRecurr.length},
      ]);
    // todo: go to booking page when this is selected
  };


  const handleSelectEvent = (event) => {
    console.log(event.title );
    if (event.title == BOOKING) return;
    console.log("selecting event...");
    // TODO: confirm the 
    const r = window.confirm("Would you like to remove this event?")
    if(r) {
      let eventsAfterDeletion = [];
      eventsToRecurr.forEach(function(e) {
        // need to re-add to the events to fix the ids
        console.log(e.id, event)
        if (e.id != event.id) 
        eventsAfterDeletion.push({...e, id: eventsAfterDeletion.length });
      });
      console.log("after deletion", eventsAfterDeletion);
      setEventsToRecurr(eventsAfterDeletion);
    }
  }


  const onEventResize = (data) => {
    if (data.event.type == BOOKING) return;
    console.log("data resizing...");
    setEventsToRecurr(eventsToRecurr.map((e) => {
      if (e.id == data.event.id) {
        return { ...e, start: data.start, end: data.end }
      }
      return e
    }))
  };


  const onEventDrop = (data) => {
    console.log(data)
    if (data.event.type == BOOKING) return;
    console.log("event dropped...");
    setEventsToRecurr(eventsToRecurr.map((e) => {
      if (e["id"] == data.event.id) {
        return { ...e, start: data.start, end: data.end }
      }
      return e
    }))
  };
  

  const onSubmitEditRecurr = () => {
    console.log("submitting recurr edit...");

    // backend stores recurring availabilities in times HH:MM:SS
    const eventsToRecurrFormatted = [];
    eventsToRecurr.forEach(function(e) {
      eventsToRecurrFormatted.push({ 
          dayOfWeek: e.start.getDay(),
          start: getTimeFromDate(e.start), 
          end: getTimeFromDate(e.end) 
      })
    })

    axios({ 
      method: "POST", 
      url: "http://localhost:5000/addRecurrAvailability",
      data: { events: eventsToRecurrFormatted }
     })
      .then(() => {
        setMode(VIEW);
      })
      .catch((err) => {
        console.log(err);
      });
    
    // TODO: instead make a call to /getAllAvailabilities to get merged availabiliteis
    // ugly: how is merged availability data formatted
    setAllAvailabililties(recurrEvents(eventsToRecurr, 4));
  }

  const onSubmitEditNonRecurr = () => {
    console.log("submitting non-recurr edit...");
    
    axios({ 
      method: "POST", 
      url: "http://localhost:5000/addNonRecurrAvailability",
      data: { events: nonRecurrEvents }
     })
      .then(() => {
        setMode(VIEW);
      })
      .catch((err) => {
        console.log(err);
      });
    
    // UGLY: how to merge availabilities here? 
  }


  // setEventsToRecurr(allAvailabililties) resets the recurr view if not submitting  
  return (
    <div>
      <button onClick={() => {setMode(VIEW); setEventsToRecurr(allAvailabililties)}}>View</button>
      <button onClick={() => {setMode(RECURRING)}}>Recurr</button>
      <button onClick={() => {setMode(NONRECURR)}}>Non-recurr</button>
      {/* todo: no overlap */}

      {mode==VIEW && (
      <div>
        <h2>VIEW</h2>
        <p>editing {mode==RECURRING ? 'recurring' : 'nonrecurring'} dates</p>
        <div className="prof-calender">
          <Calendar
            views={["week", "day"]}
            localizer={localizer}
            defaultDate={new Date()} 
            defaultView="week"
            events={concatEvents(allAvailabililties, bookings)}
            style={{ height: "100vh" }}
            eventPropGetter={(eventStyleGetter)}
          />
        </div>
      </div>
      )}

      {(mode==RECURRING || mode==NONRECURR) && (
        <div>
          <h2>{mode}</h2>
          <p>editing {mode==RECURRING ? 'recurring' : 'nonrecurring'} dates</p>
          <div className={mode==RECURRING ? "prof-calender recurr" : "prof-calender non-recurr"}>
            <DragAndDropCalendar
              views={["week", "day"]} 
              selectable
              localizer={localizer}
              defaultDate={new Date()} 
              defaultView="week"
              events={concatEvents(eventsToRecurr, bookings)}
              style={{ height: "100vh" }}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelect}
              onEventDrop={onEventDrop}
              onEventResize={onEventResize}
              eventPropGetter={(eventStyleGetter)}
            />
          </div>
          <button onClick={mode==RECURRING ? onSubmitEditRecurr : onSubmitEditNonRecurr}>Submit</button>
        </div>
      )}
      
    </div>
  );
}

export default ProfCalender;