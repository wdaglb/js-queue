# js-queue
js浏览器端的一个队列插件

## 安装

```
npm install @kingeast/queue
or
yarn add @kingeast/queue
```

## 使用

```
const list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 初始化一个并行数3的队列
// <传入元素类型,返回元素类型>
const queue = new KQueue<number, number[]>(3);

// 设置数据列表
queue.setTask(list);

// 添加任务处理回调
queue.addHandler((data) => {
    return new Promise(resolve => {
        const t = ke.getRandom(1, 6);
        setTimeout(() => {
            console.log('data', data);
            resolve([t, data]);
        }, t * 1000);
    });
});

// 开始队列
queue.start().then((results) => {
    // 返回的results不会因处理的速度而顺序混乱
    console.log('全部任务处理完成', results);
});
```
