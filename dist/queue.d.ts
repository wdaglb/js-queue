export declare class KQueue {
    private readonly count;
    private tasks;
    private taskLength;
    private successId;
    private results;
    private handler;
    constructor(count: number);
    setTask(task: any[]): void;
    addHandler(call: (data: any) => Promise<any>): void;
    private resolve;
    start(): Promise<any[]>;
}
