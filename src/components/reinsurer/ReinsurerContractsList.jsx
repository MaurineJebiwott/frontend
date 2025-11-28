
import { useEffect, useState } from "react";
import API from "../../api";
import { useContracts } from '../../ContractsContext'
export default function ReinsurerContractsList() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputPercent, setInputPercent] = useState({}); // track input per contract
  const { triggerRefresh } = useContracts();
  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await API.get("api/contracts/available/"); // ✅ fetch only contracts with remaining %
      setContracts(res.data);
    } catch (err) {
      console.error("Error fetching contracts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (contractId, status) => {
    try {
      const percentage = inputPercent[contractId] || "";
    
    // Validate percentage for acceptance
        if (status === "accepted") {
          if (!percentage || parseFloat(percentage) <= 0) {
            alert("Please enter a valid percentage");
            return;
         }
      }
      const payload = {
        contract: contractId,
        status,
        percentage_taken: status === "accepted" ? percentage.toString() : "0",
        // percentage_taken: status === "accepted" ? (inputPercent[contractId] || "").toString() : "0",

      };

      await API.post("api/contracts/participate/", payload);
      setInputPercent((prev) => ({ ...prev, [contractId]: "" }));
      fetchContracts();
      triggerRefresh();
    } catch (err) {
      console.error("Error submitting participation:", err);
      if (err.response) {
        console.error("Error data:", err.response.data);
        alert(`Error: ${JSON.stringify(err.response.data)}`)
      }
    }
  };

  if (loading) return <p>Loading contracts...</p>;
  if (contracts.length === 0) return <p>No contracts available at the moment.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Contracts</h2>
      <ul className="space-y-3">
        {contracts.map((c) => (
          <li key={c.id} className="border p-4 rounded">
            <div className="font-medium">{c.type}</div>
            <div className="text-sm text-gray-600">
              Cedant: {c.cedant_name} | Coverage: {c.coverage} | Remaining: {c.remaining_percentage}%
            </div>

            <div className="mt-2 flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max={c.remaining_percentage}
                placeholder="Enter %"
                value={inputPercent[c.id] || ""}
                onChange={(e) =>
                  setInputPercent((prev) => ({ ...prev, [c.id]: e.target.value }))
                }
                className="border rounded px-2 py-1 w-24"
              />
              <button
                onClick={() => handleDecision(c.id, "accepted")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecision(c.id, "rejected")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
