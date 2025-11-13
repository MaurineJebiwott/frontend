// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login/", {
        username: identifier, // backend handles username OR email
        password,
      });

      // Save JWT tokens
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // Save user details
      localStorage.setItem("role", res.data.user.role);       // 👈 keep only this
      localStorage.setItem("username", res.data.user.username);

      console.log("User logged in:", res.data.user);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Username or Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
// // src/pages/Login.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("token/", { username, password });
//       localStorage.setItem("token", res.data.access);
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Login
//         </button>
//       </form>
//       <p className="mt-4 text-sm">
//         Don’t have an account? <Link to="/signup" className="text-blue-500">Signup</Link>
//       </p>
//     </div>
//   );
// }
