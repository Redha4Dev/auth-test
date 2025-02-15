import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRouters from "./utils/ProtectedRouters";
import Home from "./Pages/Home";
import Profiles from "./Pages/Profiles";

function App() {
  const [dataF, setDataF] = useState({ name: '', email: '' });
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
    // <div className="bg-white h-screen p-20 w-screen">
    //   <form onSubmit={handleSubmit} className="bg-[#EFEFEF] w-fit mx-auto flex flex-col p-6 gap-4 border-[1px] border-black rounded-2xl shadow-2xl ">
    //     <h1 className="text-black font-medium">Sending Data :</h1>
    //     <label className="font-xl text-black font-medium">Name :</label>
    //     <input className="bg-white border-black border-[1px] rounded-xl text-xl outline-none text-black px-4" type="text" name="name" value={dataF.name} onChange={handleChange} />
    //     <label className="font-xl text-black font-medium">Email :</label>
    //     <input className="bg-white border-black border-[1px] rounded-xl text-xl outline-none text-black px-4" type="email" name="email" value={dataF.email} onChange={handleChange} />
    //     <button className="outline-none" type="submit">Submit</button>
    //   </form>

    //   {response && (
    //     <div>
    //       <h2>Server Response:</h2>
    //       <pre>{JSON.stringify(response, null, 2)}</pre>
    //     </div>
    //   )}
      <BrowserRouter>
        <Routes>
          <Route element={<Login/>} path="/Login"/>
          <Route element={<ProtectedRouters/>} >
            <Route element={<Home/>} path="/"/>
            <Route element={<Profiles/>} path="/Profiles"/>
          </Route>
        </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
