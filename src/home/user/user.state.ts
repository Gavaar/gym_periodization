import { AuthUser } from "home/auth/auth.state";
import { FireStore } from "home/__helpers/store/firestore";
import { Dispatch, useEffect, useState } from "react";

const DEFAULT_USER = { blockIds: [] };
export const userStore = new FireStore<User>('user');

export interface User { blockIds: number[] };
export function useUser(auth: AuthUser): [User, Dispatch<User>] {
    const [user, setUser] = useState<User>(DEFAULT_USER);

    useEffect(() => {
        userStore.get().then(userFound => {
            setUser(userFound as User);
        });
    }, [auth]);

    return [user, setUser];
}
