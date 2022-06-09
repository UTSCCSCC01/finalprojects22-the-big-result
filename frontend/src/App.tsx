import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import ProviderPage from './components/Provider/ProviderPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/listServiceProviders" element={<ProviderPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
