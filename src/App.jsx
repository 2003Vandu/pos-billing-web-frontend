import { useContext, useState } from "react";
import MenuBar from "./Componesnts/MenuBar/MenuBar";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ManageCategories from "./Pages/ManageCategories/ManageCategories";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";
import Manageitem from "./Pages/Manageitems/Manageitems";
import Explore from "./Pages/Explore/Explore";
import { Toaster } from "react-hot-toast"
import Login from "./Pages/Login/Login";
import OrderHistory from "./Componesnts/OrderHistory/OrderHistory";
import { AppContext } from "./Context/Appcontext";
import NotFound from "./Componesnts/NotFound/NotFound";

function App() {

  {/*Use to restrict thr location */}
  const location =  useLocation();

  // use to make protect a page if admin or user is not login then no access to any page 
  const {auth} = useContext(AppContext);

  // hear we destructure the auth and get element 
  const LoginRoute = ({element}) => {

    // if user is logedin then we will not allow user to go back to login page 
    if(auth.token){
      return <Navigate to="/dashboard" replace/>
    }
    return element;
  }

  {/** allow only specific orle or admin */}
  const ProtectedRoute =({element, allowedRoles}) =>{
    if(!auth.token){
      return <Navigate  to="/login" replace/>
    }  
    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace/>

    }
    return element;
  }

  return (
    <div>
      {/*hide from this locatio login page navbar*/ }
      {location.pathname !=="/login"&&<MenuBar/>}
      <Toaster/>
      <Routes>
        {/* All routes below are now wrapped in ProtectedRoute */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} />
        <Route path="/explore" element={<ProtectedRoute element={<Explore />} />} />
        
        {/* Admin only routes */}
        <Route path="/category" element={<ProtectedRoute element={<ManageCategories />} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path="/users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path="/items" element={<ProtectedRoute element={<Manageitem />} allowedRoles={['ROLE_ADMIN']} />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<OrderHistory />} />} />
        
        {/* Root path protected */}
        <Route path="/" element={<ProtectedRoute element={<DashBoard />} />} />  
        
        <Route path="*" element={<NotFound />} />  
      </Routes>
    </div>
  );
}

export default App;
