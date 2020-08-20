const request = require("request-promise-native");
const { type } = require('os');
const fs = require("fs");

const rp = require('request-promise');
const $ = require('cheerio');

const url = 'https://bbs.uestc.edu.cn';

url_words = url.split('/');
host_url = url_words[0] + "//" + url_words[2];
console.log(host_url);




async function download_file(URL, outputFilename) {
    let Buffer = await request.get({ uri: URL, encoding: null });
    console.log("Writing downloaded file " + URL + "->" + outputFilename);
    fs.writeFileSync(outputFilename, Buffer);
}

rp(url).then(html => {
    const linkObjects = $('a', html);
    const total = linkObjects.length;
    const links = [];
    for (let i = 0; i < total; i++) {
        link = linkObjects[i].attribs.href;
        console.log('*****************' + link + '*******************');
        if (typeof (link) == 'string' && link.length > 1) {
            words = link.split('/');
            filename = words[words.length - 1].replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '_');
            if (filename.length < 2) { filename = words[words.length - 2].replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '_'); }
            if (words[0] == 'http:' || words[0] == 'https:') {
                download_file(link, filename);
            } else if (link[0] == '/') {
                download_file(host_url + link, filename);
            } else {
                download_file(host_url + '/' + link, filename);
            }
        }
        links.push(link)
    }
    console.log(links);
})
    .catch(err => {
        console.log(err);
    })