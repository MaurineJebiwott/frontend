"use client"

import { useState, useEffect } from "react"
import ContractForm from "../components/cedant/ContractForm"
import CedentContractsList from "../components/cedant/CedentContractsList"
import ReinsurerContractsList from "../components/reinsurer/ReinsurerContractsList"
import AcceptedContracts from "../components/reinsurer/AcceptedContracts"

export default function ContractsDashboard() {
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    // Load user data from localStorage
    const role = localStorage.getItem("role")
    const username = localStorage.getItem("username")

    if (role && username) {
      setUser({ role, username })
    } else {
      window.location.href = "/login"
    }
  }, [])

  const handleReload = () => setReload((prev) => !prev)

  const handleLogout = () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    window.location.href = "/login"
  }

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <div className="h-12 w-12 border-4 border-amber-600 border-t-transparent rounded-full"></div>
          </div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-6">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent mb-2">
            Welcome, {user.username}
          </h1>
          <p className="text-slate-400">
            Role: <span className="text-amber-400 font-semibold capitalize">{user.role}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Content */}
      {user.role === "cedant" ? (
        <div className="space-y-8">
          <ContractForm onCreated={handleReload} />
          <CedentContractsList reload={reload} />
        </div>
      ) : (
        <div className="space-y-8">
          <ReinsurerContractsList />
          <AcceptedContracts />
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
