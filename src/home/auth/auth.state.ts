import { getAuth, onAuthStateChanged, UserCredential } from "@firebase/auth";
import BackupStore from "home/__helpers/store/backup-store";
import { Dispatch, useEffect, useState } from "react";

const authStore = new BackupStore<AuthUser>('loggedUser');

export type AuthUser = Partial<UserCredential['user']> | undefined;
export function useAuth(): [AuthUser, Dispatch<AuthUser>] {
    const [auth, setAuth] = useState<AuthUser>();

    useEffect(() => {
        onAuthStateChanged(
            getAuth(),
            async (user) => { 
                if (user) {
                    const { uid, photoURL } = user;
                    setAuth({ uid, photoURL });
                    authStore.set({ uid, photoURL });
                } else {
                    authStore.delete();
                    setAuth(undefined);
                }
            }
        );
    }, []);

    return [auth, setAuth];
}
