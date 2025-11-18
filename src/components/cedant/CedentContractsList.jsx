import { useState, useEffect } from "react";
import api from "../../api";

export default function CedentContractsList({reload}) {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await api.get("/api/contracts/"); // ✅ backend returns cedent's own contracts
        setContracts(res.data);
      } catch (err) {
        console.error("Failed to fetch contracts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [reload]); //refresh whenever reload changes 
  function formatNumber(num) {
    if (num == null) return "";
    return Number(num).toLocaleString();
  }

  if (loading) return <p>Loading your contracts...</p>;

  if (contracts.length === 0)
    return <p className="text-gray-600">No contracts created yet.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Your Contracts</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Coverage</th>
              <th className="px-4 py-2 border">Start</th>
              <th className="px-4 py-2 border">End</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Reinsurer</th>
              <th className="px-4 py-2 border">Share (%)</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr key={c.id} className="text-center border-t">
                <td className="px-4 py-2 border">{c.type}</td>
                <td className="px-4 py-2 border">{formatNumber(c.coverage)}</td>
                <td className="px-4 py-2 border">{c.start_date}</td>
                <td className="px-4 py-2 border">{c.end_date}</td>
                <td className="px-4 py-2 border">{c.status}</td>
                <td className="px-4 py-2 border">
                  {c.reinsurer_name || "—"}
                </td>
                <td className="px-4 py-2 border">
                  {c.share_percentage || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}






