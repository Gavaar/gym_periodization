import { getAuth, onAuthStateChanged, UserCredential } from "@firebase/auth";
import BackupStore from "home/__helpers/store/backup-store";
import React, { Dispatch, useEffect, useState } from "react";

export type LoggedUser = Partial<UserCredential['user'] | undefined>;
export const loggedUserStore = new BackupStore<Partial<UserCredential['user']>>('loggedUser');

function useUser(): [LoggedUser, Dispatch<React.SetStateAction<LoggedUser>>] {
    const [user, setUser] = useState<LoggedUser>({});

    useEffect(() => {
        onAuthStateChanged(
            getAuth(),
            (loggedUser) => {
                // we allow server to add the logged status
                if (loggedUser) {
                    const { uid, photoURL } = loggedUser;
                    loggedUserStore.set({ uid, photoURL });
                    setUser({ uid, photoURL });
                } else {
                    setUser({});
                }
            }
        );
    }, []);

    return [user, setUser];
}

export const UserProvider = React.createContext<[LoggedUser, Dispatch<LoggedUser>]>([{}, () => {}]);

export function UserContext({ children }: JSX.ElementChildrenAttribute) {
    const [user, setUser] = useUser();

    return (
        <UserProvider.Provider value={[user, setUser]}>
            {children}
        </UserProvider.Provider>
    );
}
