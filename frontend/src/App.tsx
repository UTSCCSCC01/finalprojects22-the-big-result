import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./views/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
