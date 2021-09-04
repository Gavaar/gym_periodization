import { getAuth, signOut } from "firebase/auth";

export default function logout(): Promise<void> {
    const auth = getAuth();
    return signOut(auth);
}
