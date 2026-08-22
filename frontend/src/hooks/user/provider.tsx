import { UserEntity } from "../../entities/UserEntity";
import { useState } from "react";
import { UserContext } from "./context";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserEntity | null>(null)
    return (
        <UserContext.Provider value={{ user,setUser }}>
            {children}
        </UserContext.Provider>
    );
};