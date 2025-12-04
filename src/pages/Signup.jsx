// // // src/pages/Signup.jsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     phone_number: "",
//     role: "cedant",
//     password: "",
//     password2: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:8000/auth/register/", form);
//       alert("Registration successful! You can now login.");
//       navigate("/login");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Registration failed ❌");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800">
//           Create Account
//         </h2>

//         <input
//           type="text"
//           value={form.username}
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//           placeholder="Username"
//           required
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           placeholder="Email"
//           required
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="text"
//           value={form.phone_number}
//           onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
//           placeholder="Phone Number"
//           required
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <select
//           value={form.role}
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="cedant">Cedant</option>
//           <option value="reinsurer">Reinsurer</option>
//           <option value="admin">Admin</option>
//         </select>

//         <input
//           type="password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           placeholder="Password"
//           required
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="password"
//           value={form.password2}
//           onChange={(e) => setForm({ ...form, password2: e.target.value })}
//           placeholder="Confirm Password"
//           required
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Sign Up
//         </button>

//         <p className="text-sm text-center text-gray-600">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_number: "",
    role: "cedant",
    password: "",
    password2: "",
  })
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://127.0.0.1:8000/auth/register/", form)
      alert("Registration successful! You can now login.")
      navigate("/login")
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert("Registration failed ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Main form container */}
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md p-8 md:p-10 bg-slate-800 rounded-3xl shadow-2xl space-y-6 backdrop-blur-sm border border-slate-700 transform transition-all duration-300 hover:shadow-2xl animate-fadeIn"
      >
        {/* Header */}
        <div className="text-center space-y-2 animate-slideDown">
          <h2 className="text-4xl font-bold text-amber-400">Join Us</h2>
          <p className="text-slate-300 text-sm font-medium">Create your reinsurance account</p>
        </div>

        {/* Username */}
        <div
          className="relative transform transition-all duration-300"
          style={{
            transform: focusedField === "username" ? "scale(1.02)" : "scale(1)",
          }}
        >
          <label className="text-xs font-semibold text-slate-300 mb-2 block">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            onFocus={() => setFocusedField("username")}
            onBlur={() => setFocusedField(null)}
            placeholder="Your username"
            required
            className="w-full px-4 py-3 bg-slate-700 text-slate-100 placeholder-slate-500 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-slate-500"
          />
        </div>

        {/* Email */}
        <div
          className="relative transform transition-all duration-300"
          style={{
            transform: focusedField === "email" ? "scale(1.02)" : "scale(1)",
          }}
        >
          <label className="text-xs font-semibold text-slate-300 mb-2 block">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3 bg-slate-700 text-slate-100 placeholder-slate-500 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-slate-500"
          />
        </div>

        {/* Phone Number */}
        <div
          className="relative transform transition-all duration-300"
          style={{
            transform: focusedField === "phone" ? "scale(1.02)" : "scale(1)",
          }}
        >
          <label className="text-xs font-semibold text-slate-300 mb-2 block">Phone Number</label>
          <input
            type="text"
            value={form.phone_number}
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField(null)}
            placeholder="+1 (555) 000-0000"
            required
            className="w-full px-4 py-3 bg-slate-700 text-slate-100 placeholder-slate-500 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-slate-500"
          />
        </div>

        {/* Role Selection */}
        <div
          className="relative transform transition-all duration-300"
          style={{
            transform: focusedField === "role" ? "scale(1.02)" : "scale(1)",
          }}
        >
          <label className="text-xs font-semibold text-slate-300 mb-2 block">I am a</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            onFocus={() => setFocusedField("role")}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3 bg-slate-700 text-slate-100 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-slate-500 appearance-none cursor-pointer"
          >
            <option value="cedant">Cedant</option>
            <option value="reinsurer">Reinsurer</option>
            <option value="admin">Admin</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-11 text-slate-400">▼</div>
        </div>

        {/* Password */}
        <div
          className="relative transform transition-all duration-300"
          style={{
            transform: focusedField === "password" ? "scale(1.02)" : "scale(1)",
          }}
        >
          <label className="text-xs font-semibold text-slate-300 mb-2 block">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 bg-slate-700 text-slate-100 placeholder-slate-500 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-slate-500"
          />
        </div>

        {/* Confirm Password */}
        <div
          className="relative transform transition-all duration-300"
          style={{
            transform: focusedField === "confirm" ? "scale(1.02)" : "scale(1)",
          }}
        >
          <label className="text-xs font-semibold text-slate-300 mb-2 block">Confirm Password</label>
          <input
            type="password"
            value={form.password2}
            onChange={(e) => setForm({ ...form, password2: e.target.value })}
            onFocus={() => setFocusedField("confirm")}
            onBlur={() => setFocusedField(null)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 bg-slate-700 text-slate-100 placeholder-slate-500 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-slate-500"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden group"
        >
          <span className="relative z-10">Create Account</span>
          <div className="absolute inset-0 bg-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-slate-400 animate-fadeIn">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-amber-400 font-semibold hover:text-amber-300 hover:underline transition-colors duration-200"
          >
            Login here
          </a>
        </p>
      </form>

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
