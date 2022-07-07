import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Calender.css";

import * as EvFn from "../EventActions";
import * as Constants from "../Constants";

import axios from "axios";
import moment from "moment";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

function ProfCalendarEdit(props) {
  const [eventsToRecurr, setEventsToRecurr] = useState([]); // events recurring weekly
  const [viewAvailabilities, setViewAvailabilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [mode, setMode] = useState(Constants.VIEW); // default is VIEW mode
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));

  //Generic axios function
  function sendRequest(method, url, headers) {
    return axios({
      method: method,
      url: url,
      headers: headers,
    });
  }

  useEffect(() => {
    if (props.mode === Constants.RECURRING) {
      setMode(Constants.RECURRING);
      sendRequest("GET", "http://localhost:5000/getRecurrAvailability", {
        professionalId: "36",
        start: EvFn.getDateFromDateTime(viewDate),
      })
        .then((res) => {
          let sundayOfCurrWeek = EvFn.getSunday(new Date());
          let resFormatted = EvFn.formatWeekEventsForGET(
            res,
            sundayOfCurrWeek,
            Constants.AVAILABILITY
          );
          setEventsToRecurr(resFormatted);
        })
        .catch((err) => console.log(err));
    } else if (props.mode === Constants.NONRECURR) {
      setMode(Constants.NONRECURR);
      axios({
        method: "GET",
        url: `http://localhost:5000/getAvailability`,
        headers: {
          professionalId: "36",
          start: EvFn.getDateFromDateTime(viewDate),
          type: "professional",
        },
      })
        .then((res) => {
          let sundayOfCurrWeek = EvFn.getSunday(viewDate);
          let resFormatted = EvFn.formatWeekEventsForGET(
            res,
            sundayOfCurrWeek,
            Constants.AVAILABILITY
          );
          setViewAvailabilities(resFormatted);
        })
        .catch((err) => console.log(err));
      axios({
        method: "GET",
        url: `http://localhost:5000/getBookings`,
        headers: {
          professionalId: "36",
          start: EvFn.getDateFromDateTime(viewDate),
        },
      })
        .then((res) => {
          let sundayOfCurrWeek = EvFn.getSunday(viewDate);
          const resFormatted = EvFn.formatWeekEventsForGET(
            res,
            sundayOfCurrWeek,
            Constants.BOOKING
          );
          setBookings(resFormatted);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // TODO for later -> prevent from making availability events on top of current bookings
  const handleSelect = ({ start, end }) => {
    console.log("creating event ...");
    if (mode === Constants.RECURRING) {
      setEventsToRecurr([
        ...eventsToRecurr,
        {
          start: start,
          end: end,
          title: Constants.RECURRING,
          color: Constants.RECURR_AVAIL_COLOR,
          id: eventsToRecurr.length,
        },
      ]);
    } else if (mode === Constants.NONRECURR) {
      setViewAvailabilities([
        ...viewAvailabilities,
        {
          start: start,
          end: end,
          title: Constants.NONRECURR,
          color: Constants.NON_RECURR_AVAIL_COLOR,
          id: viewAvailabilities.length,
        },
      ]);
    }
  };

  // TODO for later -> make a generic function and pass in states and setStates as parameters?
  const handleSelectEvent = (event) => {
    console.log("clicking on event...");
    if (event.title === Constants.BOOKING) return;
    if (mode === Constants.RECURRING) {
      const w = window.confirm("Would you like to remove this event?");
      if (w) {
        let eventsAfterDeletion = [];
        eventsToRecurr.forEach(function (e) {
          // need to re-add to the events to fix the ids
          console.log(e.id, event);
          if (e.id !== event.id)
            eventsAfterDeletion.push({ ...e, id: eventsAfterDeletion.length });
        });
        setEventsToRecurr(eventsAfterDeletion);
      }
    } else if (mode === Constants.NONRECURR) {
      const w = window.confirm("Would you like to remove this event?");
      if (w) {
        let eventsAfterDeletion = [];
        viewAvailabilities.forEach(function (e) {
          // need to re-add to the events to fix the ids
          console.log(e.id, event);
          if (e.id !== event.id)
            eventsAfterDeletion.push({ ...e, id: eventsAfterDeletion.length });
        });
        setViewAvailabilities(eventsAfterDeletion);
      }
    }
  };

  const onEventResize = (data) => {
    console.log("event resizing...");
    if (data.event.title === Constants.BOOKING) return;
    if (mode === Constants.RECURRING) {
      setEventsToRecurr(
        eventsToRecurr.map((e) => {
          if (e.id === data.event.id)
            return { ...e, start: data.start, end: data.end };
          return e;
        })
      );
    } else if (mode === Constants.NONRECURR) {
      setViewAvailabilities(
        viewAvailabilities.map((e) => {
          if (e.id === data.event.id)
            return {
              ...e,
              start: data.start,
              end: data.end,
              color: Constants.NON_RECURR_AVAIL_COLOR,
              title: Constants.NONRECURR,
            };
          return e;
        })
      );
    }
  };

  const onEventDrop = (data) => {
    console.log("event dropped...");
    if (data.event.title === Constants.BOOKING) return;
    if (mode === Constants.RECURRING) {
      setEventsToRecurr(
        eventsToRecurr.map((e) => {
          if (e["id"] === data.event.id)
            return { ...e, start: data.start, end: data.end };
          return e;
        })
      );
    } else if (mode === Constants.NONRECURR) {
      setViewAvailabilities(
        viewAvailabilities.map((e) => {
          if (e["id"] === data.event.id)
            return {
              ...e,
              start: data.start,
              end: data.end,
              color: Constants.NON_RECURR_AVAIL_COLOR,
              title: Constants.NONRECURR,
            };
          return e;
        })
      );
    }
  };

  const onSubmitEditRecurr = () => {
    console.log("submitting recurr availability edit...");
    const eventsToRecurrFormatted =
      EvFn.formatWeekEventsForPOST(eventsToRecurr);
    axios({
      method: "POST",
      url: "http://localhost:5000/setRecurrAvailability",
      data: { events: eventsToRecurrFormatted, professionalId: "36" },
    })
      .then(() => {
        window.location = "/p/availability";
      })
      .catch((err) => console.log(err));
  };

  const onSubmitEditNonRecurr = () => {
    console.log("submitting non-recurr edit...");
    const allAvailabilitiesFormatted =
      EvFn.formatWeekEventsForPOST(viewAvailabilities);
    axios({
      method: "POST",
      url: "http://localhost:5000/setNonRecurrAvailability",
      data: {
        events: allAvailabilitiesFormatted,
        professionalId: "36",
        start: EvFn.getDateFromDateTime(viewDate),
      },
    })
      .then(() => {
        window.location = "/p/availability";
      })
      .catch((err) => console.log(err));
  };

  const onNavigate = (date, view) => {
    console.log("navigating to...", date, view, EvFn.getSunday(date));
    axios({
      method: "GET",
      url: `http://localhost:5000/getAvailability`,
      headers: {
        professionalId: "36",
        start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
        type: "professional",
      },
    })
      .then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        let resFormatted = EvFn.formatWeekEventsForGET(
          res,
          sundayOfCurrWeek,
          Constants.AVAILABILITY
        );
        setViewAvailabilities(resFormatted);
      })
      .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: `http://localhost:5000/getBookings`,
      headers: {
        professionalId: "36",
        start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
      },
    })
      .then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        const resFormatted = EvFn.formatWeekEventsForGET(
          res,
          sundayOfCurrWeek,
          Constants.BOOKING
        );
        setBookings(resFormatted);
      })
      .catch((err) => console.log(err));
    setViewDate(new Date(EvFn.getSunday(date) - 7));
  };

  return (
    <div>
      <div className="calendar">
        <h2>Edit mode.</h2>
        <p>
          editing{" "}
          {props.mode === Constants.RECURRING ? "recurring" : "nonrecurring"}{" "}
          dates
        </p>
        {props.mode === Constants.NONRECURR && (
          <p>
            nonrecurring events are only edited every week after submit. your
            edits are lost if not submitting weekly.
          </p>
        )}
        <div
          className={
            props.mode === Constants.RECURRING
              ? "prof-calender recurr"
              : "prof-calender non-recurr"
          }
        >
          <DragAndDropCalendar
            views={["week", "day"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="week"
            events={
              props.mode === Constants.RECURRING
                ? eventsToRecurr
                : EvFn.concatEvents(viewAvailabilities, bookings)
            }
            style={{ height: "100vh" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelect}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            no-overlap
            eventPropGetter={EvFn.eventStyleGetter}
            onNavigate={onNavigate}
          />
        </div>
        <button
          onClick={
            props.mode === Constants.RECURRING
              ? onSubmitEditRecurr
              : onSubmitEditNonRecurr
          }
          style={{ padding: "10px 100px", margin: "10px 25px" }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            props.sendMode(Constants.VIEW);
          }}
          style={{ padding: "10px 100px", margin: "10px 25px" }}
        >
          Cancel Edit
        </button>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default ProfCalendarEdit;
