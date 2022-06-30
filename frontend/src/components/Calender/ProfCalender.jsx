import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import axios from "axios";
import moment from "moment";
// import events from "./events";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import './Calender.css';

moment.locale("en-GB", {week: {dow: 1, doy: 1,}});
const localizer = momentLocalizer(moment);

// Calendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);


// TODO: send recurr availability as time not date 	getHours(), getMinutes

// new: formatting events
// const event = [
//   {
//     start: moment('2021-03-14', 'YYYY-MM-DD').toDate(),
//     end: moment('2021-03-14', 'YYYY-MM-DD').add(2, "hours").toDate(),
//     title: "Cumple"
//   }
// ];

// new: events are the availability of the professionals
// make date object new Date('2015-01-30 10:00')
// repeat each event for next 4 months
// no overlapping availability
// can move avialble events around

var dateFormat = 'YYYY-DD-MM HH:mm:ss'; // 'YYYY-DD-MM HH:mm:ss';
var testDateUtc = moment.utc('2015-01-30 10:00:00');
var localDate = testDateUtc.local();
console.log(localDate.format(dateFormat));
const datee = new Date();
console.log(datee.getHours().toString(), datee.getSeconds().toString());

// constants
const RECURRING = "recurring";
const ACTUAL = "ACTUAL";
const VIEW = "VIEW";
const BOOKING = "BOOKING"
const AVAILABILITY = "AVAILABILITY"
const BOOKING_COLOR = "C20232"
const AVAIL_COLOR = "7E0080"


function ProfCalender() {
  // todo: change name from events to availability
  const [eventsToRecurr, setEventsToRecurr] = useState([]); // events for one week that will recurr
  const [allAvailabililties, setAllAvailabililties] = useState([]); // todo repeat eventsToRecurr 4 times for a month from todays day
  const [bookings, setBookings] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // both bookings and availabilities
  const [mode, setMode] = useState(VIEW);


  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/getRecurrAvailability`,

    }).then((res) => {
        const res_formatted = res.data.map((r) => {
          return { ...r, 
            start: moment(r.start, 'YYYY-MM-DD HH:mm:ss').toDate(), 
            end: moment(r.end, 'YYYY-MM-DD HH:mm:ss').toDate(),
            title: AVAILABILITY, 
            color: AVAIL_COLOR}
        })
        setEventsToRecurr(res_formatted);
        setAllAvailabililties(recurrEvents(res_formatted, 2));

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
  
  
  // event, start, end, isSelected
  const eventStyleGetter = (event, start, end, isSelected) => {
      var backgroundColor = '#' + event.color;
      var style = {
          backgroundColor: backgroundColor,
          borderRadius: '10px',
          opacity: 0.7,
          color: 'white',
          border: '20px',
          display: 'block',
          boxShadow: 'black'
      };
      return { style: style };
  }

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
  

  const getNextWeek = (date) => {
    // courtsey: https://stackoverflow.com/questions/1025693/how-to-get-next-week-date-in-javascript
    var nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    return nextWeek;
  }


  // todo: numWeeks
  const recurrEvents = (eventsToRecur, numWeeks) => {
    let recurredEvents = [];
    eventsToRecur.forEach(function(e) {
        recurredEvents.push({...e, id: recurredEvents.length });
        recurredEvents.push({...e, 
          start: getNextWeek(e.start), 
          end: getNextWeek(e.end), 
          id: recurredEvents.length })
      });
    return recurredEvents;
  }

  const getTimeFromDate = (date) => {
    return date.getHours().toString().padStart(2, '0') + ":" +
          date.getMinutes().toString().padStart(2, '0') + ":" +
          date.getSeconds().toString().padStart(2, '0');
  }

  const onSubmitEditRecurr = () => {
    console.log("submitting edit...")
    setMode(VIEW);
    // todo: send data to backend
    if (mode==RECURRING) {
      setAllAvailabililties(recurrEvents(eventsToRecurr, 2));
    }

    // backend stores recurring availabilities in times HH:MM:SS
    const eventsToRecurrFormatted = [];
    eventsToRecurr.forEach(function(e) {
      console.log("THIS IS e", e, e.start.getDay());
      eventsToRecurrFormatted.push({ 
          dayOfWeek: e.start.getDay(),
          start: getTimeFromDate(e.start), 
          end: getTimeFromDate(e.end) 
      })
    })

    axios({ 
      method: "POST", 
      url: "http://localhost:5000/setRecurrAvailability",
      data: { events: eventsToRecurrFormatted }
     })
      .then(() => {
        //  done sending info
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // setEventsToRecurr(allAvailabililties) resets the recurr view if not submitting  
  return (
    <div>
      <button onClick={() => {setMode(VIEW); setEventsToRecurr(allAvailabililties)}}>View</button>
      <button onClick={() => {setMode(RECURRING)}}>Recurr</button>
      <button onClick={() => {setMode(ACTUAL)}}>Non </button>
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
            events={allAvailabililties.concat(bookings)}
            style={{ height: "100vh" }}
            eventPropGetter={(eventStyleGetter)}
          />
        </div>
      </div>
      )}

      {(mode==RECURRING || mode==ACTUAL) && (
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
              events={eventsToRecurr.concat(bookings)}
              style={{ height: "100vh" }}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelect}
              onEventDrop={onEventDrop}
              onEventResize={onEventResize}
              eventPropGetter={(eventStyleGetter)}
            />
          </div>
          <button onClick={onSubmitEditRecurr}>Submit</button>
        </div>
      )}
      
    </div>
  );
}

export default ProfCalender;