import './profile.css';
import { getAuth, onAuthStateChanged, UserCredential } from "@firebase/auth";
import login from "home/profile/login";
import { useEffect, useState } from 'react';
import BackupStore from 'home/__helpers/store/backup-store';
import logout from './logout';
import ConfirmWithBanner from '__components__/confirm-banner/confirm-banner';

const userStore = new BackupStore<Partial<UserCredential['user']>>('loggedUser');

export default function Profile(): JSX.Element {
    const [user, setUser] = useState<Partial<UserCredential['user'] | undefined>>();

    useEffect(() => {
        onAuthStateChanged(
            getAuth(),
            (user) => { 
                if (user) {
                    const { uid, photoURL } = user;
                    setUser({ uid, photoURL });
                    userStore.set({ uid, photoURL });
                }
            }
        );
    }, []);

    async function loginUser(): Promise<void> {
        try {
            const result = await login();
            const { uid, photoURL } = result.user;
            setUser({ uid, photoURL });
            userStore.set({ uid, photoURL });
        } catch (e) {
            console.error(e);
        }
    }

    async function logoutUser(): Promise<void> {
        const selection = await ConfirmWithBanner('Sign out?');
        if (selection) {
            logout().then(() => {
                setUser(undefined);
                userStore.delete();
            });  
        }
    }

    return (
        <div className="Profile" onClick={user ? logoutUser : loginUser}>
            {user ? 
                <div className="Profile__pic" style={{ backgroundImage: `url(${user.photoURL!})` }}></div> :
                <div>&#128100;</div>}
        </div>
    );
}
