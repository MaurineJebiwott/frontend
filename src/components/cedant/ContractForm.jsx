// src/components/cedent/ContractForm.jsx
import { useState } from "react";
import API from "../../api";

export default function ContractForm({onCreated}) {
  const [form, setForm] = useState({
    type: "",
    start_date: "",
    end_date: "",
    coverage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("api/contracts/", form);
      onCreated();  //Trigger reload
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
      <input
        type="number"
        placeholder="Coverage"
        value={form.coverage}
        onChange={(e) => setForm({ ...form, coverage: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Contract
      </button>
    </form>
  );
}
