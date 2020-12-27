export declare class KQueue<T, B> {
    private readonly count;
    private tasks;
    private taskLength;
    private successId;
    private results;
    private handler;
    constructor(count: number);
    setTask(task: T[]): void;
    addHandler(call: (data: T) => Promise<any>): void;
    private resolve;
    start(): Promise<B[]>;
}
