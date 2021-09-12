import BackupStore from "./backup-store";
import { doc, collection, addDoc, getDoc, setDoc, getDocs, deleteDoc, DocumentReference, CollectionReference, DocumentData } from "firebase/firestore"; 
import { firestore } from "index";

const NON_LOGGED_TOKEN = 'non-logged-user';
export class FireStore<T> {
    private tempStore = new BackupStore<T>(`TEMP_${this.uri}`);
    private get userUid(): string {
        const userStore = new BackupStore<{ uid: string }>('loggedUser');
        return userStore.get()?.uid || NON_LOGGED_TOKEN;
    }
    private get uri(): string {
        const updateUri = this.originalUri.split('/');
        updateUri.splice(1, 0, this.userUid);
        return updateUri.join('/');
    }

    constructor(protected originalUri: string) {}

    async get(userId?: string): Promise<T | T[] | undefined> {
        if (this.isNotLoggedIn()) {
            return this.tempStore.get();
        }

        try {
            const reference = this.buildReference(userId);

            if (reference instanceof CollectionReference) {
                const response = await getDocs(reference);
                const list: T[] = [];
                response.forEach(doc => {
                    list.push({ id: doc.id, ...doc.data() as T });
                });
                return list;
            } else if (reference instanceof DocumentReference) {
                const response = await getDoc(reference);
                return { id: response.id, ...response.data() as T };
            }
        } catch (e) {
            console.error(e);
        }
    }

    async patch(t: T & { id?: string | number }): Promise<T | undefined> {
        if (this.isNotLoggedIn()) {
            this.tempStore.set(t);
            return t;
        }

        if (t.id && +t.id === -1) {
            delete t.id;
        }
        const reference = this.buildReference(t.id);

        try {
            if (reference instanceof DocumentReference) {
                await setDoc(reference, t, { merge: true });
                return t;
            } else if (reference instanceof CollectionReference) {
                const response = await addDoc(reference, t);
                return { id: response.id, ...t };
            }
        } catch (e) {
            console.error(e);
        }
    }

    async delete(id: string): Promise<void> {
        if (this.isNotLoggedIn()) {
            this.tempStore.delete();
        }

        const reference = this.buildReference(id) as DocumentReference;

        try {
            await deleteDoc(reference);
        } catch (e) {
            console.error(e);
        }
    }

    private isNotLoggedIn(): boolean {
        return this.userUid === NON_LOGGED_TOKEN;
    }

    private buildReference(id?: string | number): CollectionReference<DocumentData> | DocumentReference<DocumentData> {
        const uri = buildUriFromId(this.uri, id);
        const refPoints = uri.split('/');
        const baseCollection = refPoints.shift()!;

        // if we have more than base + uid, for pair we have collections, for unpair we have documents
        if (refPoints.length % 2 === 0) {
            return collection(firestore, baseCollection, ...refPoints);
        }

        return doc(firestore, baseCollection, ...refPoints);
    }
}

function buildUriFromId(uri: string, id?: string | number): string {
    if (!id || +id === -1) {
        return uri;
    }
    return `${uri}/${id}`;
}
