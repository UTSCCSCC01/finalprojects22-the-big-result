import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./views/SignUp";
import ProviderPage from "./components/Provider/ProviderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listServiceProviders" element={<ProviderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
