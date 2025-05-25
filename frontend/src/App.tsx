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
import Meals from "./Pages/Meals";
import KidProfile from "./Pages/Users/KidProfile";
import ParentProfile from "./Pages/Users/ParentProfile";
import Inbox from "./Pages/Inbox";
import Mail from "./Pages/Mail";
import Settings from "./Pages/Settings";
import Teachers from "./Pages/Users/Teachers";
import EditKidPage from "./Pages/editKidPage";
import EmailVerification from "./Pages/emailVerif";
import TeacherProfile from "./Pages/Users/TeacherProfile";
import EditParentPage from "./Pages/editParentPage";
import EditTeacherPage from "./Pages/editTeacherPage";

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
        <Route element={<LandingPage />} path="/" />
        <Route element={<EmailVerification />} path="/verify/:code" />
        <Route element={<Login />} path="/Login" />
        <Route element={<SignUp />} path="/SignUp" />
        <Route element={<ForgotPassword />} path="/ForgotPassword" />
        <Route element={<ResetPassword />} path="/ResetPassword/:token" />
        <Route element={<ProtectedRouters />}>
          <Route element={<Profiles />} path="/Profiles" />
          <Route element={<Dashboard />} path="/Dashboard" />
          <Route element={<Settings />} path="/settings"  />
          <Route element={<Kids />} path="Users/Kids" />
          {/* <Route element={<KidProfile />} path="Users/Kids/:id/:name" /> */}
          <Route element={<Parents />} path="Users/Parents" />
          <Route element={<ParentProfile/>} path="Users/Parents/:id/:name" />
          <Route element={<EditParentPage/>} path="Users/Parents/:id/:name/edit" />
          <Route element={<Teachers/>} path="Users/Teachers" />
          <Route element={<TeacherProfile/>} path="Users/Teachers/:id/:name" />
          <Route element={<EditTeacherPage/>} path="Users/Teachers/:id/:name/edit" />
          <Route element={<Meals />} path="/Meals" />
          <Route element={<Inbox/>} path="/Inbox" />
          <Route element={<Mail/>} path="/Inbox/:id"/>
          <Route element={<EditKidPage />} path="/Users/Kids/:id/:name" /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
