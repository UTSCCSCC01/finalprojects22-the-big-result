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

var dateFormat = 'YYYY-DD-MM HH:mm:ss';
var testDateUtc = moment.utc('2015-01-30 10:00:00');
var localDate = testDateUtc.local();
console.log(localDate.format(dateFormat));

function ProfCalender() {
  const [currEvents, setcurrEvents] = useState([]);
  const [recurringEvents, setRecurringEvents] = useState([]); // todo repeat currEvents 4 times for a month from todays day
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/defaultAvailability`,
    }).then((res) => {
        // window.location = "/successlogin" // go to default 

        console.log("default availability from backend: ", res.data);
        const res_formatted = res.data.map((r) => {
          return { ...r, 
            start: moment(r.start, 'YYYY-MM-DD HH:mm:ss').toDate(), 
            end: moment(r.end, 'YYYY-MM-DD HH:mm:ss').toDate() }

        })
        console.log("default availability from backend formatted: ", res.data);
        setcurrEvents(res_formatted);

      }).catch((err) => console.log(err));
  }, []);
  

  const handleSelect = ({ start, end }) => {
    console.log("selecting event ...");
    const title = 'available'; //window.prompt("Are you sure this is the event time you want?");

    // new: duplicate the event for the next 4 weeks? (set a default)
    // const month = start.getDay(); # gets day of the week
    
    setcurrEvents([
        ...currEvents,
        { start: start, end:end, title:title, id:currEvents.length},
      ]);
    // todo: go to booking page when this is selected
  };

  const handleSelectEvent = (event) => {
    alert("Setting availability for " + event.title);
    // todo: allow deleting events here
  }

  const onEventResize = (data) => {
    console.log("data resizing...");
    setcurrEvents(currEvents.map((e) => {
      if (e.id == data.event.id) {
        return { ...e, start: data.start, end: data.end }
      }
      return e
    }))
  };

  const onEventDrop = (data) => {
    console.log("event dropped...");
    setcurrEvents(currEvents.map((e) => {
      if (e["id"] == data.event.id) {
        return { ...e, start: data.start, end: data.end }
      }
      return e
    }))
  };
  console.log("currEvents displayed:", currEvents)

  // todo: have a default style for each calender instead of repeating   
  return (
    <div>
      <button onClick={() => setEditMode(false)}>Normal mode</button>
      <button onClick={() => setEditMode(true)}>Edit mode default dates</button>
      {/* <button onClick={showCalenderEditMode}>Edit mode actual dates</button> */}
      {/* todo: no overlap */}
      {editMode && (
        <div className="prof-calender">
        <DragAndDropCalendar
          views={["week"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()} 
          defaultView="week"
          events={currEvents}
          style={{ height: "100vh" }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelect}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
        />
      </div>
      )}
      {!editMode && (
        <div className="prof-calender">
        <Calendar
          views={["week", "month"]}
          localizer={localizer}
          defaultDate={new Date()} 
          defaultView="week"
          events={currEvents}
          style={{ height: "100vh" }}
        />
      </div>
      )}
    </div>
  );
}

export default ProfCalender;