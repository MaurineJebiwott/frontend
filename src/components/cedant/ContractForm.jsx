
// import { useState } from "react";
// import API from "../../api";

// export default function ContractForm({ onCreated }) {
//   const [form, setForm] = useState({
//     type: "",
//     start_date: "",
//     end_date: "",
//     coverage: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // 👇 CLEAN coverage before sending
//       const payload = {
//         ...form,
//         coverage: Number(form.coverage.replace(/,/g, "")), 
//       };

//       await API.post("api/contracts/", payload);
//       onCreated(); // Reload list

//       // Reset form
//       setForm({ type: "", start_date: "", end_date: "", coverage: "" });
//     } catch (err) {
//       console.error("Error creating contract:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      
//       <input
//         type="text"
//         placeholder="Contract Type"
//         value={form.type}
//         onChange={(e) => setForm({ ...form, type: e.target.value })}
//         className="w-full border rounded px-3 py-2"
//         required
//       />

//       <input
//         type="date"
//         value={form.start_date}
//         onChange={(e) => setForm({ ...form, start_date: e.target.value })}
//         className="w-full border rounded px-3 py-2"
//         required
//       />

//       <input
//         type="date"
//         value={form.end_date}
//         onChange={(e) => setForm({ ...form, end_date: e.target.value })}
//         className="w-full border rounded px-3 py-2"
//         required
//       />

//       {/* 👇 UPDATED: formatted coverage input */}
//       <input
//         type="text"
//         placeholder="Coverage"
//         value={form.coverage}
//         onChange={(e) => {
//           const raw = e.target.value.replace(/\D/g, ""); // digits only
//           const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add commas
//           setForm({ ...form, coverage: formatted });
//         }}
//         className="w-full border rounded px-3 py-2"
//         required
//       />

//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//         Create Contract
//       </button>
//     </form>
//   );
// }


"use client"

import { useState } from "react"
import API from "../../api"

export default function ContractForm({ onCreated }) {
  const [form, setForm] = useState({
    type: "",
    start_date: "",
    end_date: "",
    coverage: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...form,
        coverage: Number(form.coverage.replace(/,/g, "")),
      }

      await API.post("api/contracts/", payload)
      onCreated()

      // Reset form
      setForm({ type: "", start_date: "", end_date: "", coverage: "" })
    } catch (err) {
      console.error("Error creating contract:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-xl border border-slate-700 animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-amber-400 mb-6">Create New Contract</h2>

      <input
        type="text"
        placeholder="Contract Type"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200"
            required
          />
          <span className="absolute -top-2 left-4 bg-slate-900 px-2 text-xs font-semibold text-amber-400">
            Start Date
          </span>
        </div>

        <div className="relative">
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200"
            required
          />
          <span className="absolute -top-2 left-4 bg-slate-900 px-2 text-xs font-semibold text-amber-400">
            End Date
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Enter coverage amount"
          value={form.coverage}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "")
            const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            setForm({ ...form, coverage: formatted })
          }}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200"
          required
        />
        <span className="absolute -top-2 left-4 bg-slate-900 px-2 text-xs font-semibold text-amber-400">
          Coverage Amount
        </span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Contract"}
      </button>
    </form>
  )
}
