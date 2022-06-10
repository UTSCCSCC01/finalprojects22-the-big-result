import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile/Profile";
import ProviderPage from './components/Provider/ProviderPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/listServiceProviders" element={<ProviderPage/>}/>
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