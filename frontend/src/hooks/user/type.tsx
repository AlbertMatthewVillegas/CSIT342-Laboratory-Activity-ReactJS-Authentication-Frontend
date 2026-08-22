import { UserEntity } from "../../entities/UserEntity";

export interface UserContextType {
    user: UserEntity | null;
    setUser: React.Dispatch<React.SetStateAction<UserEntity | null>>;
}
