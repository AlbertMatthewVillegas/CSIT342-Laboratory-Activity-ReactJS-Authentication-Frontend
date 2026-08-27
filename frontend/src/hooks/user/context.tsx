import React, { createContext } from 'react'

interface UserContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
