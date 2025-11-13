// src/components/reinsurer/AcceptedContracts.jsx
import { useEffect, useState } from "react";
import API from "../../api";

export default function AcceptedContracts() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await API.get("api/contracts/");
      // ✅ Only show active ones
      setContracts(res.data.filter((c) => c.status === "active"));
    } catch (err) {
      console.error("Error fetching accepted contracts:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Accepted Contracts</h2>
      <ul className="space-y-3">
        {contracts.map((c) => (
          <li key={c.id} className="border p-4 rounded">
            <div className="font-medium">{c.type}</div>
            <div className="text-sm text-gray-600">
              Cedant: {c.cedant_name} | Coverage: {c.coverage}
            </div>
            <div className="text-sm text-green-600">
              Share: {c.share_percentage}% (Status: {c.status})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
