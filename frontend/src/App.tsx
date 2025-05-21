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
import Parents from "./Pages/Users/Parents";
import LandingPage from "./Pages/LandingPage";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import ClassScheduling from "./Pages/Scheduling";
import Scheduling from "./Pages/Scheduling";
import Meals from "./Pages/Meals";
import KidProfile from "./Pages/Users/KidProfile";
import ParentProfile from "./Pages/Users/ParentProfile";
import Inbox from "./Pages/Inbox";
import Mail from "./Pages/Mail";

function App() {

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
        <Route element={<LandingPage />} path="/LandingPage" />
        <Route element={<Login />} path="/Login" />
        <Route element={<SignUp />} path="/SignUp" />
        <Route element={<ForgotPassword />} path="/ForgotPassword" />
        <Route element={<ResetPassword />} path="/ResetPassword/:token" />
        <Route element={<Home />} path="/" />
        <Route element={<ProtectedRouters />}>
          <Route element={<Profiles />} path="/Profiles" />
          <Route element={<Dashboard />} path="/Dashboard" />
          <Route element={<Kids />} path="Users/Kids" />
          <Route element={<KidProfile />} path="Users/Kids/:id/:name" />
          <Route element={<Parents />} path="Users/Parents" />
          <Route element={<ParentProfile/>} path="Users/Parents/:id/:name" />
          <Route element={<Scheduling />} path="/Scheduling" />
          <Route element={<Meals />} path="/Meals" />
          <Route element={<Inbox/>} path="/Inbox" />
          <Route element={<Mail/>} path="/Inbox/:id"/>

        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
