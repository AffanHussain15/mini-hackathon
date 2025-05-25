// import './App.css'
// import React from "react";
// // import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signin from "./component/Signin/Signin";
// import Dashboard from "./component/Dashboard/Dashboard";
// import Signup from "./component/Signup/Signup";
// import ProtectedRoutes from "./component/ProtectedRoutes/ProtectedRoutes";


// function App() {
  

//   return (
//     <>
//     <Router>
//       <Routes>
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="/Signin" element={<Signin />} />
//         <Route
//           path="/Signin"
//           element={
//             <ProtectedRoutes>
//               <Dashboard />
//             </ProtectedRoutes>
//           }
//         />
//       </Routes>
//     </Router>
//   </>
//   )
// }

// export default App



import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import supabase from '../src/component/Supabase/supabase'; // Adjust path to your Supabase config
import Signup from '../src/component/Signup/Signup';
import Signin from '../src/component/Signin/Signin';
import CustomerDashboard from '../src/component/Customer/Customer-Dashboard';
import AdminDashboard from '../src/component/Admin/AdminDashboard';

const ProtectedRoute = ({ children, allowedRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" />;
  
  const userRole = user.user_metadata?.role;
  if (userRole !== allowedRole) {
    return <Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/customer-dashboard'} />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute allowedRole="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;