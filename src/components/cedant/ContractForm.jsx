
import { useState } from "react";
import API from "../../api";

export default function ContractForm({ onCreated }) {
  const [form, setForm] = useState({
    type: "",
    start_date: "",
    end_date: "",
    coverage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 👇 CLEAN coverage before sending
      const payload = {
        ...form,
        coverage: Number(form.coverage.replace(/,/g, "")), 
      };

      await API.post("api/contracts/", payload);
      onCreated(); // Reload list

      // Reset form
      setForm({ type: "", start_date: "", end_date: "", coverage: "" });
    } catch (err) {
      console.error("Error creating contract:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      
      <input
        type="text"
        placeholder="Contract Type"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="date"
        value={form.start_date}
        onChange={(e) => setForm({ ...form, start_date: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="date"
        value={form.end_date}
        onChange={(e) => setForm({ ...form, end_date: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />

      {/* 👇 UPDATED: formatted coverage input */}
      <input
        type="text"
        placeholder="Coverage"
        value={form.coverage}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, ""); // digits only
          const formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add commas
          setForm({ ...form, coverage: formatted });
        }}
        className="w-full border rounded px-3 py-2"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Contract
      </button>
    </form>
  );
}


