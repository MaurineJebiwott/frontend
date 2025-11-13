// src/components/reinsurer/ReinsurerContractsList.jsx
import { useEffect, useState } from "react";
import API from "../../api";

export default function ReinsurerContractsList() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await API.get("api/contracts/");
      setContracts(res.data);
    } catch (err) {
      console.error("Error fetching contracts:", err);
    }
  };

  const handleDecision = async (id, status, share_percentage = null) => {
    try {
      await API.patch(`api/contracts/${id}/`, { status, share_percentage });
      fetchContracts();
    } catch (err) {
      console.error("Error updating contract:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Contracts</h2>
      <ul className="space-y-3">
        {contracts
          .filter((c) => c.status === "draft") // ✅ show only draft contracts
          .map((c) => (
            <li key={c.id} className="border p-4 rounded">
              <div className="font-medium">{c.type}</div>
              <div className="text-sm text-gray-600">
                Cedant: {c.cedant_name} | Coverage: {c.coverage}
              </div>
              {c.status === "draft" && (
                <div className="space-x-2 mt-2">
                  <button
                    onClick={() =>
                      handleDecision(c.id, "active", 40) // ✅ Accept = active
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept (40%)
                  </button>
                  <button
                    onClick={() => handleDecision(c.id, "rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
