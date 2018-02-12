const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = "<h1>电影首页</h1>";
})

app.listen(8080);   