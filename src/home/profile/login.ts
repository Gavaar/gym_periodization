import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";

export default function login(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider);
}
