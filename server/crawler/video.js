const puppeteer = require("puppeteer");

const base = `https://movie.douban.com/subject/`;
const doubanId = "26628329";
const videoBase = `https:movie.douban.com/trailer/219491`

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time);
});
(async () => {
    console.log("Start visit the target page");

    const browser = await puppeteer.launch({
         args: ["--no-sandbox"],
         dumpio: false
    });
    
    const page = await browser.newPage();
    await page.goto(base + doubanId, {
        waitUntil: "networkidle2"
    })

    await sleep(1000);

    const result = await page.evaluate(() => {
        const $ = window.$;
        const it = $(".related-pic-video");

        if(it && it.length > 0) {
            const link = it.attr("href");
            const cover = it.find("img").attr("src");

            return {
                link,
                cover
            }
        }
        
        return {};
    })
    let video;
    
    if (result.link) {
        await page.goto(result.link, {
            waitUntil: "networkidle2"
        })

        await sleep(2000);

        video = await page.evaluate(() => {
            const $ = window.$;
            const it = $("source");

            if(it && it.length > 0) {
                return it.attr("src");
            }

            return "";
        })
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }

    browser.close();

    process.send(data);
    process.exit(0);
})();
