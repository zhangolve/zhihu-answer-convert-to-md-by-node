const fs = require('fs');
const request = require('request');
const _ = require('lodash');
const iconv = require('iconv-lite');
const async = require('async');
const config=require('./config.js');

const zhihuId = config.zhihuId;
const dir = `./${zhihuId}`;
/* 总计共232个答案，使用最笨的方法，每次手动改变i的值来导出json数据。*/
const urls = [];
for (let i = 0; i < 13; i++) {
  const url = `https://www.zhihu.com/api/v4/members/${zhihuId}/answers?include=data%5B*%5D.is_normal%2Csuggest_edit%2Ccomment_count%2Ccollapsed_counts%2Creviewing_comments_count%2Ccan_comment%2Ccontent%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Cmark_infos%2Ccreated_time%2Cupdated_time%2Crelationship.voting%2Cis_author%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=${20 * i}&limit=20&sort_by=created`;
  urls.push(url);
}


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
      authorization: 'Bearer Mi4wQUFBQWdUSWRBQUFBQUlJWmdDTVNDeGNBQUFCaEFsVk5ZUGVMV0FBWVdoVWhTSnZlYUhRb0ZsNVAwb1ppdU1uTlNn|1482975842|3e7ac3d55a45288245cfc010548e839681204b34',
      Connection: 'keep-alive',
      DNT: 1,
      Host: 'www.zhihu.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
      'Cookie':config.Cookie
    },
    timeout: 1500,
  }, (error, response, html) => {
    if (!error) {
      let answer = JSON.stringify(response.body);
      const answerObj = JSON.parse(answer);
      answer = new Buffer(answerObj);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFile(`${dir}/${key}.json`, answer, 'utf-8', (err) => {
        if (err) throw err;
        console.log('success');
      });
    }
  });
}, () => {
  console.log('done!');
});
