const doSync = (sth, time) => new Promise(resolve => {
    setTimeout(() =>{
        console.log(`${sth}用了${time}毫秒`);
        resolve();
    }, time);
});

const doAsync = (sth, time, cb) => {
    setTimeout(() => {
        console.log(`${sth}用了${time}毫秒`);
        cb && cb();
    }, time);
};

const doElse = (sth) => {
    console.log(sth);
}
const Scott = { doAsync, doSync };
const Meizi = { doAsync, doSync, doElse };
(async () => {
    console.log("妹子来到门口");
    await Scott.doSync("Scott刷牙", 1000);
    console.log("啥也没干,一直等");
    await Meizi.doSync("妹子开始洗澡", 2000);
    Meizi.doElse("妹子去忙别的了"); 
})();