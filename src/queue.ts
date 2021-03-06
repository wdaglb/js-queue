interface KQueueTake {
  id: number;
  ruining: boolean;
  data: any;
}

export class KQueue<T, B> {
  // 并行任务数
  private readonly count: number;

  // 任务队列
  private tasks: KQueueTake[] = [];

  // 任务总数
  private taskLength: number = 0;

  // 完成任务的任务id
  private successId: number[] = [];

  // 完成的任务返回值
  private results: B[] = [];

  // 数据处理回调函数
  private handler: undefined | ((data: T) => Promise<B>) = undefined;

  constructor(count: number) {
    this.count = count;
  }

  public setTask(task: T[]) {
    this.tasks = task.map((d, i) => {
      return {
        id: i,
        ruining: false,
        data: d,
      };
    });
    this.taskLength = this.tasks.length;
  }

  public addHandler(call: (data: T) => Promise<any>) {
    this.handler = call;
  }

  private resolve(done: (results: B[]) => void) {
    if (this.successId.length === this.taskLength) {
      done(this.results);
      return;
    }
    if (this.tasks.length === 0) {
      return;
    }
    const t = this.tasks.shift();
    if (t && this.handler) {
      t.ruining = true;
      const idx = this.results.push({} as any);
      this.handler(t.data).then((result) => {
        t.ruining = false;
        if (idx > -1) {
          this.results.splice(idx - 1, 1, result);
        }
        this.successId.push(t.id);
        this.resolve(done);
      })
    }
  }

  public async start(): Promise<B[]> {
    return new Promise(async (resolve, reject) => {
      if (!this.handler) {
        return reject('hander回调函数为空');
      }
      for (let i = 0; i < this.count; i++) {
        this.resolve(resolve);
      }
    })
  }
}
