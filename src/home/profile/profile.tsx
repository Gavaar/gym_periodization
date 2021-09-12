import './profile.css';
import login from "home/profile/login";
import { MouseEvent } from 'react';
import logout from './logout';
import bannerConfirm from '__components__/confirm-banner/confirm-banner';
import { useAuth } from 'home/auth/auth.state';

export default function Profile(): JSX.Element {
    const [auth] = useAuth();

    async function logoutUser(event: MouseEvent<HTMLDivElement>): Promise<void> {
        const selection = await bannerConfirm('Sign out?', event);
        if (selection) {
            logout();
        }
    }

    return (
        <div className="Profile" onClick={auth ? logoutUser : login}>
            {auth ? 
                <div className="Profile__pic" style={{ backgroundImage: `url(${auth.photoURL!})` }}></div> :
                <div>&#128100;</div>}
        </div>
    );
}
