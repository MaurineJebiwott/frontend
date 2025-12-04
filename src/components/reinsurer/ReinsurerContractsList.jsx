"use client"

import { useState, useEffect } from "react"
import api from "../../api"

export default function ReinsurerContractsList() {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [inputPercent, setInputPercent] = useState({})
  const [submittingId, setSubmittingId] = useState(null)

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await api.get("/api/contracts/available/")
        setContracts(res.data)
      } catch (err) {
        console.error("Failed to fetch available contracts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchContracts()
  }, [])

  function formatNumber(num) {
    if (num == null) return ""
    return Number(num).toLocaleString()
  }

  function formatDate(dateString) {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleDecision = async (contractId, status) => {
    try {
      const percentage = inputPercent[contractId] || ""

      if (status === "accepted") {
        if (!percentage || Number.parseFloat(percentage) <= 0) {
          alert("Please enter a valid percentage")
          return
        }
      }

      setSubmittingId(contractId)

      const payload = {
        contract: contractId,
        status,
        percentage_taken: status === "accepted" ? percentage.toString() : "0",
      }

      await api.post("/api/contracts/participate/", payload)
      setInputPercent((prev) => ({ ...prev, [contractId]: "" }))

      const res = await api.get("/api/contracts/available/")
      setContracts(res.data)
    } catch (err) {
      console.error("Error submitting participation:", err)
      alert(`Error: ${err.response?.data?.detail || "Failed to process participation"}`)
    } finally {
      setSubmittingId(null)
    }
  }

  if (loading)
    return (
      <div className="mt-8 text-center">
        <div className="inline-block animate-spin">
          <div className="h-8 w-8 border-4 border-amber-600 border-t-transparent rounded-full"></div>
        </div>
        <p className="mt-2 text-slate-300">Loading available contracts...</p>
      </div>
    )

  if (contracts.length === 0)
    return <p className="text-slate-400 mt-8 text-center">No available contracts at this time.</p>

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-amber-400 mb-6">Available Contracts</h2>
      <div className="space-y-4">
        {contracts.map((c, index) => (
          <div
            key={c.id}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 transition-all duration-300 hover:shadow-lg"
            style={{
              animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-slate-400 text-sm">Type</p>
                <p className="text-slate-200 font-medium text-lg">{c.type}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Cedant</p>
                <p className="text-slate-300">{c.cedant_name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Coverage</p>
                <span className="inline-block bg-amber-900/40 border border-amber-600/60 text-amber-300 px-3 py-1 rounded-lg text-sm font-semibold">
                  ${formatNumber(c.coverage)}
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Start Date</p>
                <span className="inline-block bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-lg text-sm">
                  {formatDate(c.start_date)}
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-sm">End Date</p>
                <span className="inline-block bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-lg text-sm">
                  {formatDate(c.end_date)}
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Available %</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-16 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-600 to-amber-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${c.remaining_percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-amber-400 font-bold text-sm">{c.remaining_percentage}%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-4 mt-4">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max={c.remaining_percentage}
                  placeholder="Enter percentage %"
                  value={inputPercent[c.id] || ""}
                  onChange={(e) => setInputPercent((prev) => ({ ...prev, [c.id]: e.target.value }))}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all"
                  disabled={submittingId === c.id}
                />
                <button
                  onClick={() => handleDecision(c.id, "accepted")}
                  disabled={submittingId === c.id}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingId === c.id ? "Processing..." : "Accept"}
                </button>
                <button
                  onClick={() => handleDecision(c.id, "rejected")}
                  disabled={submittingId === c.id}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingId === c.id ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
