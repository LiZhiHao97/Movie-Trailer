const { readFile } = require("fs");
const EventEmitter = require("events");

class EE extends EventEmitter {};

const yy = new EE();

yy.on("event", () => {
    console.log("粗大事了!");
});

setTimeout(() => {
    console.log("0 毫秒到期执行的定时器回调");
}, 0);

setTimeout(() => {
    console.log("100 毫秒到期执行的定时器回调");
}, 100);

setTimeout(() => {
    console.log("200 毫秒到期执行的定时器回调");
}, 200);

readFile("../package.json", "utf-8", data => {
    console.log("完成文件1 读操作的回调");
})

readFile("../README.md", "utf-8", data => {
    console.log("完成文件2 读操作的回调");
})

setImmediate(() => {
    console.log("immediate 立即回调");
})

process.nextTick(() => {
    console.log("process.nextTick 的回调");
})

Promise.resolve()
    .then(() => {
        yy.emit("event");
        process.nextTick(() => {
            console.log("process.nextTick 的第二次回调");
        })
        console.log("Promise 的第一次回调");
    })
    .then(() => {
        console.log("Promise 的第二次回调");
    });