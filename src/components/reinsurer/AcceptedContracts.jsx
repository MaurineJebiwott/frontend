"use client"

import { useEffect, useState } from "react"
import API from "../../api"

export default function AcceptedContracts({ refreshTrigger }) {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchContracts()
  }, [refreshTrigger])

  const fetchContracts = async () => {
    try {
      const res = await API.get("api/contracts/")
      const allContracts = res.data

      // Filter contracts that have accepted participations
      const acceptedContracts = allContracts.filter((c) => c.participations?.some((p) => p.status === "accepted"))

      setContracts(acceptedContracts)
      setError(null)
    } catch (err) {
      console.error("Error fetching accepted contracts:", err)
      setError(err.response?.data?.detail || err.message)
      setContracts([])
    } finally {
      setLoading(false)
    }
  }

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

  if (loading)
    return (
      <div className="mt-8 text-center">
        <div className="inline-block animate-spin">
          <div className="h-8 w-8 border-4 border-amber-600 border-t-transparent rounded-full"></div>
        </div>
        <p className="mt-2 text-slate-300">Loading your accepted contracts...</p>
      </div>
    )

  if (error)
    return (
      <div className="mt-8 p-4 bg-red-900/30 border border-red-600/60 text-red-300 rounded-lg text-center">
        <p className="font-semibold">Error loading contracts</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    )

  if (contracts.length === 0) return <p className="text-slate-400 mt-8 text-center">No accepted contracts yet.</p>

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-amber-400 mb-6">My Accepted Contracts</h2>
      <div className="space-y-4">
        {contracts.map((contract, index) => {
          const myParticipation = contract.participations.find((p) => p.status === "accepted")
          if (!myParticipation) return null

          return (
            <div
              key={contract.id}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition-all duration-300 hover:shadow-lg"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-amber-400">{contract.type}</h3>
                  <p className="text-slate-400 text-sm">Cedant: {contract.cedant_name}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-900/30 text-green-300 border border-green-600/60">
                  {myParticipation.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Your Share</p>
                  <span className="inline-block bg-amber-900/40 border border-amber-600/60 text-amber-300 px-3 py-1 rounded-lg text-sm font-semibold">
                    {myParticipation.percentage_taken}%
                  </span>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Coverage</p>
                  <p className="text-slate-200 font-medium">${formatNumber(contract.coverage)}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Start Date</p>
                  <span className="inline-block bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-lg text-sm">
                    {formatDate(contract.start_date)}
                  </span>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">End Date</p>
                  <span className="inline-block bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-lg text-sm">
                    {formatDate(contract.end_date)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
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
