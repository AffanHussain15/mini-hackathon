import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "../Supabase/supabase";
import './Signup.css';

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   async function handleForm(e) {
//     e.preventDefault();
//     console.log(email);
//     console.log(password);
//     const { data, error } = await Supabase.auth.signUp({
//       email: email,
//       password: password,
//     });

//     if (error) {
//       console.log(error);
//     } else {
//       console.log(data);
//       alert("Signup Succesful");
//       navigate("/Home");
//       localStorage.setItem("Login user", data.session.access_token);
//     }
//   }
//   return (
//     <div>
//       <form onSubmit={(e) => handleForm(e)}>
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder=""
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder=""
//         />
//         <button>Sign up</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;



const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
  
    async function handleForm(e) {
      e.preventDefault();
  
      if (!email || !password || !username || !role) {
        alert('Please fill all fields');
        return;
      }
  
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              role: role,
            },
          },
        });
  
        if (error) {
          console.error('Signup error:', error.message);
          alert(`Error: ${error.message}`);
        } else {
          console.log('Signup data:', data);
          alert('Signup Successful');
          localStorage.setItem('Login user', data.session.access_token);
          if (role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/customer-dashboard');
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred');
      }
    }
  
    return (
      <div className="signup-container">
        <div className="signup-form-card">
          <h2 className="signup-heading">Sign Up</h2>
          <form onSubmit={handleForm}>
            <div className="signup-form-group">
              <label className="signup-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="signup-form-control"
                required
              />
            </div>
            <div className="signup-form-group">
              <label className="signup-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="signup-form-control"
                required
              />
            </div>
            <div className="signup-form-group">
              <label className="signup-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="signup-form-control"
                required
              />
            </div>
            <div className="signup-form-group">
              <label className="signup-label">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="signup-form-control"
                required
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Signup;