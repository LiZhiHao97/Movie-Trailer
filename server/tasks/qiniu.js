const qiniu = require("qiniu");
const nanoid = require("nanoid");
const config = require("../config");

const bucket = config.qiniu.bucket;
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
const cfg = new qiniu.conf.Config();
const client = new qiniu.rs.BucketManager(mac, cfg);

const uploadToQiniu = async (url, key) => {
    return new Promise((resolve, reject) => {
        client.fetch(url, bucket, key, (err, ret, info) => {
            if (err) {
                reject(err);
            } else {
                if (info.statusCode === 200) {
                    resolve({ key });
                } else {
                    reject(info);
                }
            }
        })
    })
};

(async () => {
    let movies = [
        { 
            video: 'http://vt1.doubanio.com/201802172217/dd77eb1cd1e154cfd3f6a6e2e1fd011f/view/movie/M/302260645.mp4',
            doubanId: '26628329',
            poster: "https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2511935678.jpg",
            cover: 'https://img3.doubanio.com/img/trailer/medium/2511634966.jpg?1516871780'
        }
    ]
    movies.map(async movie => {
        console.log(movie.video);
        if (movie.video && !movie.key) {
            try {
                console.log("开始传video");
                let videoData = await uploadToQiniu(movie.video, nanoid() + ".mp4");
                console.log("开始传cover");
                let coverData = await uploadToQiniu(movie.cover, nanoid() + ".png");
                console.log("开始传poster");
                let posterData = await uploadToQiniu(movie.poster, nanoid() + ".png");

                if(videoData.key) {
                    movie.videoKey = videoData.key;
                }
                if(coverData.key) {
                    movie.coveroKey = coverData.key;
                }
                if(videoData.key) {
                    movie.posterKey = posterData.key;
                }

                console.log(movie);
                { 
                    video: 'http://vt1.doubanio.com/201802172217/dd77eb1cd1e154cfd3f6a6e2e1fd011f/view/movie/M/302260645.mp4',
                    doubanId: '26628329',
                    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2511935678.jpg',
                    cover: 'https://img3.doubanio.com/img/trailer/medium/2511634966.jpg?1516871780',
                    videoKey: 'http://p4atvga6r.bkt.clouddn.com/odeNdEVQ5OrATvwSZni_y.mp4',
                    coveroKey: 'http://p4atvga6r.bkt.clouddn.com/Dl6KG2rAxM0QcUoHG7VAj.png',
                    posterKey: 'http://p4atvga6r.bkt.clouddn.com/_~bk0D8WgGPeVvt6uQxDa.png' 
                }
            } catch (err){
                console.log(err);
            }
        }
    })
})();