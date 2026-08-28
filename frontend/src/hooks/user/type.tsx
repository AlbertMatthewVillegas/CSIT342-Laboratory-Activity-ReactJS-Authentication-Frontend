import React from "react";

export interface UserContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
