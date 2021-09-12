import { AuthProvider } from "home/auth/auth.context";
import React, { Dispatch, useContext } from "react";
import { useUser, User } from "./user.state";

export const UserProvider = React.createContext<[User, Dispatch<User>]>([{ blockIds: [] }, () => {}]);

export function UserContext({ children }: JSX.ElementChildrenAttribute) {
    const [auth] = useContext(AuthProvider);
    const [user, setUser] = useUser(auth)

    return (
        <UserProvider.Provider value={[user, setUser]}>
            {children}
        </UserProvider.Provider>
    );
}
