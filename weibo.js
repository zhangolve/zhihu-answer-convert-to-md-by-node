const fs = require('fs');
const request = require('request');
const _ = require('lodash');
const iconv = require('iconv-lite');
const async = require('async');
//const config = require('./config.js');
//const zhihuId = config.zhihuId;
const dir = `./weibo`;


function getUrls()
{
    urls=[];
    for(var i=1;i<191;i++)
    {
        for(var j=0;j<2;j++)
        {
            var url = `http://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100505&topnav=1&wvr=6&is_all=1&pagebar=${j}&pl_name=Pl_Official_MyProfileFeed__21&id=1005051671682487&script_uri=/1671682487/profile&feed_type=0&page=${i}&pre_page=${i}&domain_op=100505&__rnd=1490437571964`;
            urls.push(url);
        }
    }
    return urls;
    
}

const headers = {
  
    'Content-Type': 'application/json',
    Accept: '*/*',
    charset: 'utf-8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
    Connection: 'keep-alive',
    DNT: 1,
    Host: 'weibo.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    Cookie: "SINAGLOBAL=2014644744020.988.1490365719977; wb_publish_fist100_1671682487=1; wb_publish_fist100_5311658776=1; YF-Ugrow-G0=ad83bc19c1269e709f753b172bddb094; login_sid_t=3a6696ff4ddbdd44b9d55483d1d430be; YF-V5-G0=4d1671d4e87ac99c27d9ffb0ccd1578f; _s_tentry=-; Apache=8715183470860.722.1490426352253; ULV=1490426352292:2:2:2:8715183470860.722.1490426352253:1490365720095; YF-Page-G0=1ac418838b431e81ff2d99457147068c; UOR=,,login.sina.com.cn; SCF=Avk4G7UCyHMxrsvKnmkN5DooHkqP9nTTMbEsN8HevlptkgvhE-0wYauTIHzLZQjv9u04sTbxumzN4486wbQ-jYI.; SUB=_2A2510kTHDeTxGedI7FMX-CzIwzuIHXVWpjEPrDV8PUNbmtBeLVfQkW9K035mldvKYuv5UuECxc46pWFB4w..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWhpqpWba3CrPhOui9ZAnz.5JpX5K2hUgL.Fo2cS02c1hzX1hM2dJLoI0qLxKMLB.zLBKMLxKMLB.zLB-BLxKqLBo-LBoMLxK.L1KnL1KBLxK-LBKBLBK.LxKMLBK.LB.2t; SUHB=079y94iSk-G6f5; ALF=1521969172; SSOLoginState=1490433175; un=13823zxw@sina.com; wvr=6",
};
console.log('---------start----------------');
var url = `http://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100505&topnav=1&wvr=6&is_all=1&pagebar=1&pl_name=Pl_Official_MyProfileFeed__21&id=1005051671682487&script_uri=/1671682487/profile&feed_type=0&page=1&pre_page=1&domain_op=100505&__rnd=1490437571964`;

var urls=getUrls();
loopJson(urls);

/* 得到json数据，将json数据写入本地文件*/

function getJson(url) {
    request({
        method: 'GET',
        gzip: true,
        url,
        headers,
        timeout: 3000,
    }, (error, response, html) => {
        if (!error) {
              var body=response.body;
              var bodyObj=JSON.parse(body);
              var content=bodyObj.data;
             // content="<div>this is a test</div>\n<div>are you ok</div>"
               console.log(content);
               content = new Buffer(content);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                fs.writeFile(`${dir}/1.html`, content, 'utf-8', (err, res) => {
                    if (err) throw err;
                    console.log(`write 1.html done!`);
                });
           
        }
    });
}



/* 循环写入json数据*/


function loopJson(urls) {
    async.forEachOf(urls, (url, key, callback) => {
        request({
            method: 'GET',
            gzip: true,
            url,
            headers,
            timeout: 3000,
        }, (error, response, html) => {
            if (!error) {
              var body=response.body;
              console.log(body);
              var bodyObj=JSON.parse(body);
              console.log(bodyObj);
              var content=bodyObj.data;
               console.log(content);
               content = new Buffer(content);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                fs.writeFile(`${dir}/${key}.html`, content, 'utf-8', (err, res) => {
                    if (err) throw err;
                    console.log(`write ${key}.html done!`);
                });
                
            }
        });
    }, () => {
        console.log('done!');
    });
}
