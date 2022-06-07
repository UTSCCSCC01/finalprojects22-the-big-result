import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Profile from './components/Profile/Profile'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* when going to this endpoint serve me this component */}
        <Route path="/profile" element={<Profile />} /> 
        {/* TODO: when wrong email/pass combination entered still goes to profile page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
