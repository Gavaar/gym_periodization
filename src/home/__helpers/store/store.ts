class Store<T extends { id: number }> {
    constructor(private uri: string) {}

    getList(): { [id: number]: T } {
        return { ...JSON.parse(localStorage.getItem(this.uri) || '{}') };
    }

    get(id: number): T {
        return this.getList()[id];
    }

    create(newValue: T): T {
        const oldListKeys = Object.keys(this.getList());
        const highestId = +(oldListKeys[oldListKeys.length - 1] || 0);
        newValue.id = highestId + 1;
        return this.update(highestId + 1, newValue);
    }

    update(id: number, newValue?: T): T {
        const oldList = this.getList();
        const newList = {
            ...oldList,
            [id]: newValue ? { ...this.get(id), ...newValue } : undefined,
        }
        localStorage.setItem(this.uri, JSON.stringify(newList));
        return this.get(id);
    }

    delete(id: number): void {
        this.update(id);
    }
}
export default Store;
