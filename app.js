var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');
var iconv = require('iconv-lite');
var BufferHelp = require('bufferhelper');
var app = express();

app.get('/', function(req, res) {

   
        request({
            method: 'GET',
            gzip: true,
            url: 'https://www.zhihu.com/api/v4/members/zhang-hai-26/answers?include=data%5B*%5D.is_normal%2Csuggest_edit%2Ccomment_count%2Ccollapsed_counts%2Creviewing_comments_count%2Ccan_comment%2Ccontent%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Cmark_infos%2Ccreated_time%2Cupdated_time%2Crelationship.voting%2Cis_author%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=40&sort_by=created',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'charset': 'utf-8',
                'Accept-Encoding': 'gzip, deflate, sdch, br',
                'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
                'authorization': 'Bearer Mi4wQUFBQWdUSWRBQUFBQUlJWmdDTVNDeGNBQUFCaEFsVk5ZUGVMV0FBWVdoVWhTSnZlYUhRb0ZsNVAwb1ppdU1uTlNn|1482975842|3e7ac3d55a45288245cfc010548e839681204b34',
                'Connection': 'keep-alive',
                'DNT': 1,
                'Host': 'www.zhihu.com',
                'Referer': 'https://www.zhihu.com/people/zhang-hai-26/activities',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
                "Cookie": "q_c1=871748f1bfa244acbad02d94666c87f2|1482975825000|1482975825000; _xsrf=8131f769417c3c20fca10fc0e35bd646; l_cap_id=MjNmMDQzM2UyNDliNDFkZGI0OGFkMTZlYzE5NzBiMDc=|1482975825|6b307ff5fe87dc4738ffea8fe8ccb1fa81c4e335; cap_id=NWQyODFhYjQzNjJhNDExNTk5NjE1YzM3MGJmNmVmMzY=|1482975825|b88d465ef5aa7e8bd36ee4ad256dd7c953d8dcaf; d_c0=AACCGYAjEguPToOBsk-NCoATCaVCrvfNZDk=|1482975826; _zap=aa3321d7-bc96-42b2-a3c5-15bd92a5db5b; r_cap_id=NmQ5ZmM3M2JkMzg5NDg4ZWFmM2YwMWNiYTY1ZDRhMGE=|1482975826|03b5e74144333f32802884629531127b835cea46; login=YTU2ZWM0ZTVjZjUxNDAyZDkyZGRjYzZkYWQ4NDRhMjc=|1482975840|9c44593b677e53e3a8af39fdad3d99f60e3fbba8; n_c=1; __utma=51854390.342590642.1482975917.1482975917.1482975917.1; __utmc=51854390; __utmz=51854390.1482975917.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100-1|2=registration_date=20130818=1^3=entry_date=20130818=1"

            },
            timeout: 1500
        }, function(error, response, html) {
            if (!error) {


                var answer = JSON.stringify(response.body);
                var answerObj = JSON.parse(answer);
                answer = new Buffer(answerObj);
                fs.writeFile('zhihu/1.json', answer, 'utf-8', function(err) {
                    if (err) throw err;
                    console.log('success');
                })
            }

            res.send('成功');
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
