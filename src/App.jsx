import { useState } from "react";
import MenuBar from "./Componesnts/MenuBar/MenuBar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ManageCategories from "./Pages/ManageCategories/ManageCategories";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";
import Manageitem from "./Pages/Manageitems/Manageitems";
import Explore from "./Pages/Explore/Explore";
import { Toaster } from "react-hot-toast"
import Login from "./Pages/Login/Login";

function App() {

  // Use to restrict thr location 
  const location =  useLocation();

  return (
    <div>
      {/*hide from this locatio login page navbar*/ }
      {location.pathname !=="/login"&&<MenuBar/>}
      <Toaster/>
      <Routes>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/category" element={<ManageCategories/>}/>
        <Route path="/users" element={<ManageUsers/>}/>
        <Route path="/items" element={<Manageitem/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<DashBoard/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
