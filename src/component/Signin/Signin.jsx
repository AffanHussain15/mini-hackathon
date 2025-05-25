import React, { useState } from "react";
import supabase from "../Supabase/supabase";
import { useNavigate } from "react-router-dom";

import "./Signin.css";

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   async function handleForm(e) {
//     e.preventDefault();
//     console.log(email);
//     console.log(password);
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });

//     if (error) {
//       console.log(error);
//     } else {
//       console.log(data);
//       alert("Signin Succesful");
//       navigate("/Home");
//       localStorage.setItem("Login user", data.session.access_token);
//     }
//   }
//   return (
//     <div>
//       <form onSubmit={(e) => handleForm(e)}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button>Sign in</button>
//       </form>
//     </div>
//   );
// };

// export default Signin;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleForm(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Signin error:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.log("Signin data:", data);
        alert("Signin Successful");
        localStorage.setItem("Login user", data.session.access_token);
        const role = data.user.user_metadata.role;
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred");
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-form-card">
        <h2 className="signin-heading">Sign In</h2>
        <form onSubmit={handleForm}>
          <div className="signin-form-group">
            <label className="signin-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="signin-form-control"
              required
            />
          </div>
          <div className="signin-form-group">
            <label className="signin-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="signin-form-control"
              required
            />
          </div>
          <p className="signin-link">
            Don't have an account?{" "}
            <a href="/signup" className="signin-link-text">
              Sign up
            </a>
          </p>
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
