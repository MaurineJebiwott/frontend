
"use client"

import { useState, useEffect } from "react"
import api from "../../api"

export default function CedentContractsList({ reload }) {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await api.get("/api/contracts/")
        setContracts(res.data)
      } catch (err) {
        console.error("Failed to fetch contracts:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchContracts()
  }, [reload])

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
        <p className="mt-2 text-slate-300">Loading your contracts...</p>
      </div>
    )

  if (contracts.length === 0) return <p className="text-slate-400 mt-8 text-center">No contracts created yet.</p>

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-amber-400 mb-6">Your Contracts</h2>
      <div className="overflow-x-auto rounded-xl shadow-xl border border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
              <th className="px-6 py-4 text-left text-amber-400 font-bold">Type</th>
              <th className="px-6 py-4 text-left text-amber-400 font-bold">Coverage</th>
              <th className="px-6 py-4 text-left text-amber-400 font-bold">Start Date</th>
              <th className="px-6 py-4 text-left text-amber-400 font-bold">End Date</th>
              <th className="px-6 py-4 text-left text-amber-400 font-bold">Status</th>
              <th className="px-6 py-4 text-left text-amber-400 font-bold">Participations</th>
              <th className="px-6 py-4 text-left text-amber-400 font-bold">Remaining %</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, index) => (
              <tr
                key={c.id}
                className="bg-slate-800/50 border-b border-slate-700 hover:bg-slate-800 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <td className="px-6 py-4 text-slate-200 font-medium">{c.type}</td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-amber-900/40 border border-amber-600/60 text-amber-300 px-3 py-1 rounded-lg text-sm font-semibold">
                    ${formatNumber(c.coverage)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-lg text-sm">
                    {formatDate(c.start_date)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-lg text-sm">
                    {formatDate(c.end_date)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      c.status === "active"
                        ? "bg-green-900/30 text-green-300 border border-green-600/60"
                        : "bg-slate-700/50 text-slate-300 border border-slate-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {c.participations && c.participations.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {c.participations.map((p) => (
                        <div
                          key={p.id}
                          className="bg-slate-700/60 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 text-sm transition-all duration-300 hover:border-amber-600/40 hover:bg-slate-700"
                        >
                          <div className="font-medium text-amber-400">{p.reinsurer_name}</div>
                          <div className="text-xs mt-1">
                            {p.percentage_taken}% • {p.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-600 to-amber-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${c.remaining_percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-amber-400 font-bold text-sm">{c.remaining_percentage}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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





