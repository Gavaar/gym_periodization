import React, { Dispatch } from "react";
import { AuthUser, useAuth } from "./auth.state";

export const AuthProvider = React.createContext<[AuthUser, Dispatch<AuthUser>]>([undefined, () => {}]);

export function AuthContext({ children }: JSX.ElementChildrenAttribute) {
    const [auth, setAuth] = useAuth();

    return (
        <AuthProvider.Provider value={[auth, setAuth]}>
            {children}
        </AuthProvider.Provider>
    );
}
