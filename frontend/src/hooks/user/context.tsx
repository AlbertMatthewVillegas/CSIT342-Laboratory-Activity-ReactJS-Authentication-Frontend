import React, { createContext } from 'react';
import { UserEntity } from '../../entities/UserEntity';

interface UserContextType {
    user: UserEntity | null;
    setUser: React.Dispatch<React.SetStateAction<UserEntity | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
