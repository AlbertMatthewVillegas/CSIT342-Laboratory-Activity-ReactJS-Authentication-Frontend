import { useState } from "react";
import { UserContext } from "./context";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token,setToken] = useState<string | null>(null)
    return (
        <UserContext.Provider value={{ token,setToken }}>
            {children}
        </UserContext.Provider>
    );
};