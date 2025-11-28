

import { useEffect, useState } from "react";
import { useContracts } from '../../ContractsContext'
import API from "../../api";

export default function AcceptedContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useContracts();

  useEffect(() => {
    fetchContracts();
  }, [refreshTrigger]);

  const fetchContracts = async () => {
    try {
      const res = await API.get("api/contracts/"); // fetch all contracts
      const allContracts = res.data;

      // Filter participations for the logged-in reinsurer with accepted status
      const acceptedContracts = allContracts.filter((c) =>
        c.participations?.some((p) => p.status === "accepted")
      );

      setContracts(acceptedContracts);
    } catch (err) {
      console.error("Error fetching accepted contracts:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading your accepted contracts...</p>;
  if (contracts.length === 0) return <p>No accepted contracts yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Accepted Contracts</h2>
      <ul className="space-y-3">
        {contracts.map((c) => {
          // Find this reinsurer's participation
          const myParticipation = c.participations.find((p) => p.status === "accepted");
          if (!myParticipation) return null;

          return (
            <li key={c.id} className="border p-4 rounded">
              <div className="font-medium">{c.type}</div>
              <div className="text-sm text-gray-600">
                Cedant: {c.cedant_name} | Coverage: {c.coverage}
              </div>
              <div className="text-sm text-green-600">
                Share: {myParticipation.percentage_taken}% (Status: {myParticipation.status})
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


