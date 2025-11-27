export declare class OrderedSet<T> {
    private _set;
    private _arr;
    constructor(items?: T[]);
    add(item: T): void;
    delete(item: T): void;
    has(item: T): boolean;
    toArray(): T[];
}
