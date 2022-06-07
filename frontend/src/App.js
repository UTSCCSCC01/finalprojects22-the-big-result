import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ServiceCard from './components/Services/ServiceCard.js';

function App() {

  // ! TODO Instead of hardcoding here, fetch from backend. 
  // ! TODO After button is clicked, lead to service providers stuff

  const serviceArr = [ // an array of objects
    {
      id: 1, 
      service: 'Hairstyle'
    },
    {
      id: 2, 
      service: 'Makeup'
    },
    {
      id: 3, 
      service: 'Nail Care'
    },
    {
      id: 4, 
      service: 'Landscaping'
    }
  ]

  
  //! (F) TODO Based on which one is clicked, go to a spcific list of service providers
  const onClick = (props) => alert("hi, now goes to providers of: " + props);

  //! (F) TODO or maybe do for loop?
    const serviceCards = serviceArr.map((item) => {
    return (
      <div onClick={() => onClick(item.service)}>
        <ServiceCard service={item.service} key={item.id} id={item.id}/>
      </div>
    )
  })

  return (
    // BrowserRouter: keep your UI in sync with the URL
    //! TODO No <div className="App">?

    <BrowserRouter>
    <Routes>
      {/* <div className="App"> */}
        <Route path="/services" element={serviceCards} />      
      {/* </div> */}
      </Routes>
    </BrowserRouter>

  );
}




export default App;














// import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const [currentTime, setCurrentTime] = useState(5);
//   const [currQuery, setCurrQuery] = useState(5);

//   useEffect(() => {
//     fetch('http://localhost:5000/time').then(res => {
//       // const jsonRes = res.json();
//       console.log(res);
//       return res.json();
//       // return jsonRes;
//     }).then(data => {
//       setCurrentTime(data.time);
//     });
//     fetch("http://localhost:5000/db").then(res => {
//       console.log(res);
//       return res.json();
//     }).then(data => {
//       setCurrQuery(data.myquery)
//     });
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">

//         <p>The current time is {currentTime}.</p>
//         <p>The query from the database is {currQuery}</p>
//       </header>
//     </div>
//   );
//   // return GetTime();
//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.tsx</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         Learn React
//   //       </a>
//   //     </header>
//   //   </div>
//   // );
// }

// export default App;


