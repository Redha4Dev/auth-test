import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRouters from "./utils/ProtectedRouters";
import Home from "./Pages/Home";
import Profiles from "./Pages/Profiles";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import Kids from "./Pages/Users/Kids";
import Parents from "./Pages/Users/Parent";

function App() {
  const [dataF, setDataF] = useState({ name: "", email: "" });
  const [response, setResponse] = useState(null);

  // const handleChange = (e) => {
  //   setDataF({ ...dataF, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();  // Prevent page reload
  //   try {
  //     const res = await axios.post("http://localhost:5000/", dataF, {
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     setResponse(res.data);  // Save response
  //     console.log('Data sent:', res.data);
  //   } catch (err) {
  //     console.error('Error sending data:', err);

  //   }
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/Login" />
        <Route element={<SignUp />} path="/SignUp" />
        <Route element={<ProtectedRouters />}>
          <Route element={<Home />} path="/" />
          <Route element={<Profiles />} path="/Profiles" />
          <Route element={<Dashboard />} path="/Dashboard" />
          <Route element={<Kids />} path="/Users/Kids" />
          <Route element={<Parents/>} path="/Users/Parents"/>
        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
