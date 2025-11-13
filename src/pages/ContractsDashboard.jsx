import { useState, useEffect } from "react";
import ContractForm from "../components/cedant/ContractForm";
import CedentContractsList from "../components/cedant/CedentContractsList";
import ReinsurerContractsList from "../components/reinsurer/ReinsurerContractsList";
import AcceptedContracts from "../components/reinsurer/AcceptedContracts";

export default function ContractsDashboard() {
  const [user, setUser] = useState(null);
  const [reload,setReload]=useState(false); //added a reload state
  

  useEffect(() => {
    // ✅ Load user data directly from localStorage
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (role && username) {
      setUser({ role, username });
    } else {
      // if somehow missing, redirect to login
      window.location.href = "/login";
    }
  }, []);
//function to toggle reload state
  const handleReload = () => setReload ((prev) => !prev);
  const handleLogout = () => {
    window.location.href = "/login";
  };
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 border-b pb-4">

         <h1 className="text-2xl font-bold">
            Welcome, {user.username} ({user.role})
         </h1>

  
         <button
         onClick={handleLogout}
         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
         >
         Logout
       </button>
     </div>


      {user.role === "cedant" ? (
        <>
          <ContractForm onCreated={handleReload}/>
          <CedentContractsList reload={reload} />
        </>
      ) : (
        <>
          <ReinsurerContractsList />
          <AcceptedContracts />
        </>
      )}
    </div>
  );
}

















