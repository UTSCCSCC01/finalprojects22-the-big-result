import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from './components/SuccessLogin/SuccessLogin'
import ProviderPage from './components/Provider/ProviderPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/successlogin" element={<SuccessLogin />} /> 
        <Route path="/listServiceProviders" element={<ProviderPage/>}/>
        <Route path="/profile" element={<ProviderPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
