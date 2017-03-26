const fs = require('fs');
const request = require('request');
const _ = require('lodash');
const async = require('async');

const dir = `./weibo`;

function getUrls() {
    urls = [];
    for (var i = 1; i < 191; i++) {
        for (var j = 0; j < 2; j++) {
            var url = `http://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100505&topnav=1&wvr=6&is_all=1&pagebar=${j}&pl_name=Pl_Official_MyProfileFeed__21&id=1005051671682487&script_uri=/1671682487/profile&feed_type=0&page=${i}&pre_page=${i}&domain_op=100505&__rnd=1490437571964`;
            urls.push(url);
        }
    }
    return urls;

}

const headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "SINAGLOBAL=2014644744020.988.1490365719977; wb_publish_fist100_1671682487=1; wb_publish_fist100_5311658776=1; YF-Ugrow-G0=ad83bc19c1269e709f753b172bddb094; login_sid_t=3a6696ff4ddbdd44b9d55483d1d430be; YF-V5-G0=4d1671d4e87ac99c27d9ffb0ccd1578f; _s_tentry=-; Apache=8715183470860.722.1490426352253; ULV=1490426352292:2:2:2:8715183470860.722.1490426352253:1490365720095; YF-Page-G0=1ac418838b431e81ff2d99457147068c; UOR=,,login.sina.com.cn; SCF=Avk4G7UCyHMxrsvKnmkN5DooHkqP9nTTMbEsN8HevlptkgvhE-0wYauTIHzLZQjv9u04sTbxumzN4486wbQ-jYI.; SUB=_2A2510kTHDeTxGedI7FMX-CzIwzuIHXVWpjEPrDV8PUNbmtBeLVfQkW9K035mldvKYuv5UuECxc46pWFB4w..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWhpqpWba3CrPhOui9ZAnz.5JpX5K2hUgL.Fo2cS02c1hzX1hM2dJLoI0qLxKMLB.zLBKMLxKMLB.zLB-BLxKqLBo-LBoMLxK.L1KnL1KBLxK-LBKBLBK.LxKMLBK.LB.2t; SUHB=079y94iSk-G6f5; ALF=1521969172; SSOLoginState=1490433175; un=13823zxw@sina.com; wvr=6",
    "DNT": 1,
    Host: "weibo.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
};

console.log('---------start----------------');
var url = `http://weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=100505&topnav=1&wvr=6&is_all=1&pagebar=1&pl_name=Pl_Official_MyProfileFeed__21&id=1005051671682487&script_uri=/1671682487/profile&feed_type=0&page=1&pre_page=1&domain_op=100505&__rnd=1490437571964`;

var urls = getUrls();

loopJson(urls);



/* 循环写入json数据*/
/* 使用 forEachOfLimit 时，要有一个next参数用来继续执行，类似于promise的then,
不然的话，只会执行limit数量的请求。
 */
/* http://caolan.github.io/async/docs.html#eachOfLimit   */

/*
加上limit之后，速度降低了，也能够得到比较完整的网页了但是还是有一些问题，在全部379页中，
只有一页（第300页是缺失的），但是还有很多页，大概十页左右，出现了由于速度太快显示「正在加载中，请稍后」的字样。
当然这个时候是在limit=5的时候出现的
*/
// just waste time because settimeout is async .
       //   console.time('waste')
       // for(var i=0;i<1e8;i++)
       // {
       //   
       //  }
       // console.timeEnd('waste')
       //经过测试很有意思，执行1e8次的时间大概是500ms左右。
       //我们可以控制整个事件，来起到延时的作用。
       //但是要注意的是，如果1e10的话，cpu占用率将会非常高，在chrome下单页面达到了50%，可以理解为是
       //已经进入了死循环，因为1e10，已经达到了100亿次。 耗时也达到了近一分钟。


//

function loopJson(urls) {
    console.log('1');
    async.forEachOfLimit(urls, 1, function (url, key,next) {
     request({
            method: 'GET',
            gzip: true,
            url,
            headers,
            timeout: 3000,
        }, (error, response, html) => {
            if (error) {
                console.log(error);
            }
            if (!error) {
                var body = response.body;

                var bodyObj = JSON.parse(body);

                var content = bodyObj.data;

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
     // just waste time because settimeout is async .
       // var spendTime=0
       // for(var i=0;i<1e8;i++)
       // {
       //    spendTime+=i;
       //  } 
    next();
    }, () => {
        console.log('done!');
    });
}


