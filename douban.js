// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var _=require('lodash');
var iconv=require('iconv-lite');
var BufferHelp=require('bufferhelper');
var app = express();

app.get('/', function(req, res) {
    // Let's scrape Anchorman 2
    url = 'https://movie.douban.com/top250';
    request({
        method: 'GET',
        url: 'https://movie.douban.com/top250',
        gzip: true,
        headers: {
            'Accept':'*/*',
            'charset':'utf-8',
            'Accept-Encoding':'gzip, deflate, sdch, br',
            'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
            
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
           

        },
        timeout: 1500
    }, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            //console.log(response);//    var jsonObj=JSON.parse(data); 
            //var jsonObj=JSON.parse(response);
            //console.log(jsonObj);
            //var response=response.toString('utf-8');

            var data=response.data;
            
            var answer=JSON.stringify(html);
            //var bufferHelper = new BufferHelper()
                console.log('real:',answer);
                answer=new Buffer(answer);
                //iconv.decode(bufferHelper.toBuffer(),'GBK')
            fs.appendFile('zhihu/answer.txt',answer,'utf-8',function(err){
                if(err) throw err;
                console.log('success');
            })
            /*
            _.times(data.length,function(i){
            var answer=new Buffer(data[i].content);

            fs.appendFile('zhihu/'+i+'.html',answer,'utf8',function(err){  
            if(err) throw err;  
            console.log('write JSON into ',i,'.html');  
            });

            })
            */
           
        }

        res.send('你好!')
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

var http = require('http');
var server = http.createServer(engine);
server.listen(8080, function() {
    console.log('server was hit by a request')
});

function engine(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('hey hello world' + request.url);
}
