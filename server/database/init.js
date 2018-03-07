const mongoose = require("mongoose");
const db = "mongodb://localhost/douban-trailer";
mongoose.Promise = global.Promise;

exports.connect = () => {
    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
        }
    
        mongoose.connect(db);
    
        mongoose.connection.on("disconnected", () => {
            if (++maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                throw new Error("数据库挂了吧, 快去修吧少年");
            }   
        });
    
        mongoose.connection.on("error", (err) => {
            if (++maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                throw new Error("数据库挂了吧, 快去修吧少年");
            }
        });
    
        mongoose.connection.once("open", () => {
            const Dog = mongoose.model("Dog", { name: String });
            const doga = new Dog({name: "蟹粽蜴"});

            doga.save().then(() => {
                console.log("wang");
            })

            resolve();
            console.log("MongoDB connnected successful");    
        });
    })
}