"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function Login() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [activeSection, setActiveSection] = useState("hero")
  const [hoveredRole, setHoveredRole] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login/", {
        username: identifier,
        password,
      })
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)
      localStorage.setItem("role", res.data.user.role)
      localStorage.setItem("username", res.data.user.username)
      console.log("User logged in:", res.data.user)
      navigate("/dashboard")
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert("Invalid credentials ❌")
    }
  }

  const scrollToLogin = () => {
    setActiveSection("login")
    setTimeout(() => {
      document.getElementById("login-form").scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-slate-100 shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-amber-400">ReinsureVault</h1>
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setActiveSection("about")}
              className="hover:text-amber-400 transition font-medium text-slate-200"
            >
              About
            </button>
            <button
              onClick={scrollToLogin}
              className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-lg font-medium transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      {activeSection === "hero" && (
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-700 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-2000"></div>
          </div>
          <div className="max-w-4xl text-center space-y-8 relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-100">Reinsurance Contract Management</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Streamline your reinsurance operations with intelligent contract management. Connect cedants and
              reinsurers seamlessly.
            </p>
            <button
              onClick={() => {
                setActiveSection("about")
                setTimeout(() => {
                  document.getElementById("comparison").scrollIntoView({ behavior: "smooth" })
                }, 100)
              }}
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </section>
      )}

      {/* ABOUT SECTION */}
      {activeSection === "about" && (
        <section className="min-h-screen px-6 py-20 space-y-20 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
          {/* REINSURANCE EXPLANATION */}
          <div className="max-w-4xl mx-auto space-y-8">
            <button
              onClick={() => setActiveSection("hero")}
              className="text-amber-400 hover:text-amber-300 font-semibold mb-4"
            >
              ← Back to Home
            </button>
            <h2 className="text-4xl font-bold text-slate-100">What is Reinsurance?</h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Reinsurance is insurance for insurance companies. It's a mechanism where an insurance company (the
                cedant) transfers a portion of its risk portfolio to another insurance company (the reinsurer) to manage
                potential losses and stabilize their business operations.
              </p>
              <p>
                In the reinsurance market, cedants cede their risks to reinsurers who have greater financial capacity
                and expertise in managing large-scale claims. This creates a more stable insurance ecosystem where risks
                are distributed efficiently across multiple parties.
              </p>
            </div>
          </div>

          {/* ANIMATED COMPARISON */}
          <div id="comparison" className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-100 mb-12 text-center">Cedant vs Reinsurer</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* CEDANT CARD */}
              <div
                onMouseEnter={() => setHoveredRole("cedant")}
                onMouseLeave={() => setHoveredRole(null)}
                className={`bg-slate-800 rounded-xl p-8 border-2 border-slate-700 cursor-pointer transition-all duration-300 transform ${
                  hoveredRole === "cedant"
                    ? "scale-105 shadow-2xl border-amber-500"
                    : "hover:shadow-lg hover:border-slate-600"
                }`}
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-100">Cedant</h3>
                  <div className="h-1 w-12 bg-amber-600"></div>
                  <p className="text-slate-300">Original insurance company that issues policies to customers</p>

                  {hoveredRole === "cedant" && (
                    <div className="mt-6 space-y-3 pt-4 border-t border-slate-700 animate-in fade-in slide-in-from-top-2">
                      <p className="font-semibold text-slate-100">Key Responsibilities:</p>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>✓ Issues insurance policies to customers</li>
                        <li>✓ Handles customer relationships</li>
                        <li>✓ Transfers excess risk to reinsurers</li>
                        <li>✓ Manages claims coordination</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* REINSURER CARD */}
              <div
                onMouseEnter={() => setHoveredRole("reinsurer")}
                onMouseLeave={() => setHoveredRole(null)}
                className={`bg-slate-800 rounded-xl p-8 border-2 border-slate-700 cursor-pointer transition-all duration-300 transform ${
                  hoveredRole === "reinsurer"
                    ? "scale-105 shadow-2xl border-amber-500"
                    : "hover:shadow-lg hover:border-slate-600"
                }`}
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-100">Reinsurer</h3>
                  <div className="h-1 w-12 bg-amber-600"></div>
                  <p className="text-slate-300">Insurance company that accepts risk from cedants</p>

                  {hoveredRole === "reinsurer" && (
                    <div className="mt-6 space-y-3 pt-4 border-t border-slate-700 animate-in fade-in slide-in-from-top-2">
                      <p className="font-semibold text-slate-100">Key Responsibilities:</p>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>✓ Accepts ceded risks from cedants</li>
                        <li>✓ Manages large-scale claims</li>
                        <li>✓ Provides financial stability</li>
                        <li>✓ Bears a portion of losses</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* KEY DIFFERENCES TABLE */}
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">Key Differences</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 pb-4 border-b border-slate-700">
                <p className="font-bold text-slate-100">Aspect</p>
                <p className="font-bold text-slate-100">Cedant</p>
                <p className="font-bold text-slate-100">Reinsurer</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <p className="text-slate-300">Primary Role</p>
                <p className="text-slate-400">Direct insurer</p>
                <p className="text-slate-400">Risk bearer</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <p className="text-slate-300">Customer Interaction</p>
                <p className="text-slate-400">Direct with clients</p>
                <p className="text-slate-400">B2B relationships</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <p className="text-slate-300">Risk Exposure</p>
                <p className="text-slate-400">Transfers excess risk</p>
                <p className="text-slate-400">Assumes transferred risk</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LOGIN FORM SECTION */}
      {activeSection === "login" && (
        <section id="login-form" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
          </div>
          <div className="w-full max-w-md space-y-8 relative z-10">
            <div className="text-center">
              <button
                onClick={() => setActiveSection("hero")}
                className="text-amber-400 hover:text-amber-300 font-semibold mb-6"
              >
                ← Back to Home
              </button>
              <h2 className="text-4xl font-bold text-slate-100">Login</h2>
              <p className="text-slate-300 mt-2">Access your reinsurance contracts</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 space-y-6"
            >
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 block">Username or Email</label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your username or email"
                  className="w-full px-4 py-3 bg-slate-700 text-slate-100 placeholder-slate-500 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-slate-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-700 text-slate-100 placeholder-slate-500 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-slate-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </form>

            <p className="text-center text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 text-center py-6 border-t border-slate-800">
        <p>© 2025 ReinsureVault. All rights reserved.</p>
      </footer>

      {/* Custom animations */}
      <style>{`
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
