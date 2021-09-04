class BackupStore<T> {
    constructor(protected uri: string) {}

    get(): T | undefined {
        const item = localStorage.getItem(this.uri);
        if (item) return JSON.parse(item);
        return;
    }

    set(t: T): void {
        localStorage.setItem(this.uri, JSON.stringify(t));
    }

    delete(): void {
        localStorage.removeItem(this.uri);
    }
}
export default BackupStore;
