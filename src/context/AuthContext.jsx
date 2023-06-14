import { createContext } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const user = { login: true };

  return (
    <authContext.Provider value={{ user }}>{children}</authContext.Provider>
  );
}
