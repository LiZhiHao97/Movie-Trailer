//http://api.douban.com/v2/movie/subject/1764796

const rp = require("request-promise-native");

async function fetchMovie (item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`;

    const res = await rp(url);

    return res;
};

(async () => {
    let movies = [
        { 
            doubanId: 27598314,
            title: '是非',
            rate: 7.1,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512226355.jpg' 
        },
        {
            doubanId: 30135041,
            title: '生活没那么可怕',
            rate: 8,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512320554.jpg'
        } 
    ]

    movies.map(async movie => {
        let movieData = await fetchMovie(movie);

        try {
            movieData = JSON.parse(movieData);
            console.log(movieData.tags);
            console.log(movieData.summary);
        } catch (err) {
            console.log(err);
        }
    })
})();
