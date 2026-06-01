import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("academia5c_progress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("academia5c_progress", JSON.stringify(progress));
  }, [progress]);

  const completeModule = (id) => setProgress((p) => ({ ...p, [id]: 100 }));
  const updateProgress = (id, val) => setProgress((p) => ({ ...p, [id]: Math.min(100, val) }));
  const isLocked = (id) => id > 1 && !progress[id - 1];

  return (
    <AppContext.Provider value={{ progress, completeModule, updateProgress, isLocked }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);