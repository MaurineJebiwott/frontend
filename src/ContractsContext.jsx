// ContractsContext.js
import { createContext, useContext, useState } from 'react';

const ContractsContext = createContext();

export function ContractsProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <ContractsContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </ContractsContext.Provider>
  );
}

export const useContracts = () => useContext(ContractsContext);