const fs = require('fs');
const request = require('request');
const _ = require('lodash');
const iconv = require('iconv-lite');
const async = require('async');
const config=require('./config.js');

const zhihuId = config.zhihuId;
const dir = `./${zhihuId}`;
const urls = [];

for (let i = 0; i < 50; i++) {

  const url = `https://www.zhihu.com/api/v4/members/${zhihuId}/answers?include=data%5B*%5D.is_normal%2Csuggest_edit%2Ccomment_count%2Ccollapsed_counts%2Creviewing_comments_count%2Ccan_comment%2Ccontent%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Cmark_infos%2Ccreated_time%2Cupdated_time%2Crelationship.voting%2Cis_author%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=${20 * i}&limit=20&sort_by=created`;
  urls.push(url);
}

console.log('---------start----------------');
async.forEachOf(urls, (url, key, callback) => {
  request({
    method: 'GET',
    gzip: true,
    url,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      charset: 'utf-8',
      'Accept-Encoding': 'gzip, deflate, sdch, br',
      'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
      authorization: config.authorization,
      Connection: 'keep-alive',
      DNT: 1,
      Host: 'www.zhihu.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
      'Cookie':config.Cookie
    },
    timeout: 3000,
  }, (error, response, html) => {
    
    if (!error) {
      let answer = JSON.stringify(response.body);
      const answerObj = JSON.parse(answer);
      answer = new Buffer(answerObj);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
     // if(answer.length>2000)
      //{
        fs.writeFile(`${dir}/${key}.json`, answer, 'utf-8', (err,res) => {
        if (err) throw err;
       console.log( `write ${key}.json done!`);
        });
     // }
    }
  });
}, () => {
  console.log('done!');
});
