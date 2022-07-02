bookings = [
  {
    "id": 100,
    "start": "2022-07-1 10:00:00",
    "end": "2022-07-1 14:00:00",
  }, 
  {
    "id": 101,
    "start": "2022-07-2 11:00:00",
    "end": "2022-07-2 15:00:00",
  },
]

recurringAvailabilities = {
  "0": [
    { "start": "09:00:00", "end": "11:00:00" },
    { "start": "02:00:00", "end": "05:00:00" }
  ],
  "1": [
    { "start": "4:30:00:00", "end": "17:30:00" },
    { "start": "02:30:00", "end": "03:30:00" }
  ],
  '2': [],
  '3': [],
  '4': [],
  '5': [],
  '6': [],
}

allAvailabilities = {
  "0": [
    { "start": "09:00:00", "end": "11:00:00" },
    { "start": "02:00:00", "end": "05:00:00" }
  ],
  "1": [
    { "start": "4:30:00:00", "end": "17:30:00" },
    { "start": "02:30:00", "end": "03:30:00" }
  ],
  "2": [
    { "start": "09:00:00", "end": "11:00:00" },
    { "start": "02:00:00", "end": "05:00:00" }
  ],
  "3": [
    { "start": "4:30:00:00", "end": "17:30:00" },
    { "start": "02:30:00", "end": "03:30:00" }
  ],
  '4': [],
  '5': [],
  '6': [],
}

nonRecurringAvailabilities = [
  {
    "id": 102,
    "start": "2022-06-28 13:00:00",
    "end": "2022-06-28 13:30:00",
  }, 
]


customer_data = [
  {
    "id": 0,
    "first_name": "cust",
    "last_name": "one",
    "email": "custone@utoronto.ca",
    "password": "1234",
    "username":"custoneuser"
  },
  {
    "id": 1,
    "first_name": "cust",
    "last_name": "two",
    "email": "custtwo@utoronto.ca",
    "password": "5678",
    "username": "custtwouser"
  }
]
provider_data = [
  {
    "id": 0,
    "first_name": "prov",
    "last_name": "one",
    "email": "provone@utoronto.ca",
    "password": "1234",
    "location": "Toronto, ON",
    "services_provided": ["hairstyle", "landscaping"],
    "username": "provoneuser"
  },
  {
    "id": 1,
    "first_name": "prov",
    "last_name": "two",
    "email": "provtwo@utoronto.ca",
    "password": "5678",
    "location": "Toronto, ON",
    "services_provided": ["makeup", "landscaping"],
    "username": "provtwouser"
  }
]


