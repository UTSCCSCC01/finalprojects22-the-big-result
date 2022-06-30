const getNextWeek = (date) => {
  // courtsey: https://stackoverflow.com/questions/1025693/how-to-get-next-week-date-in-javascript
  var nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  return nextWeek;
}


const recurrEvents = (eventsToRecur, numWeeks) => {
  let recurredEvents = [];

  eventsToRecur.forEach(function(e) {
    let currStart = e.start;
    let currEnd = e.end;
    for (let week_i=0; week_i < numWeeks; week_i++) {
      recurredEvents.push({...e, start: currStart, end: currEnd, id: recurrEvents.length})
      currStart = getNextWeek(currStart);
      currEnd = getNextWeek(currEnd);
    }
  });
  return recurredEvents;
}

const getTimeFromDate = (date) => {
  return date.getHours().toString().padStart(2, '0') + ":" +
        date.getMinutes().toString().padStart(2, '0') + ":" +
        date.getSeconds().toString().padStart(2, '0');
}

const eventStyleGetter = (event, start, end, isSelected) => {
  var backgroundColor = '#' + event.color;
  var style = {
      backgroundColor: backgroundColor,
      borderRadius: '10px',
      opacity: 1,
      color: 'white',
      border: '20px',
      display: 'block',
      boxShadow: 'black'
  };
  return { style: style };
}

const concatEvents = (eventsArr1, eventArr2) => {
  let res = [];
  eventsArr1.concat(eventArr2).forEach(e => {
    res.push({...e, id: res.length});
  });
  return res;
}

export {getNextWeek, recurrEvents, getTimeFromDate, eventStyleGetter, concatEvents};