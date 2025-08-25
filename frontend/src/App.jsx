import { Routes, Route } from "react-router-dom";   // ⬅️ Missing import added
import Register from './components/authentication/Receiver/Register';
import Login from './components/authentication/Receiver/Login';

import DonorLogin from "./components/authentication/Donor/DonorLogin";
import DonorRegister from "./components/authentication/Donor/DonorRegister";
import AdminLogin from "./components/authentication/Admin/AdminLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/register" element={<DonorRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
