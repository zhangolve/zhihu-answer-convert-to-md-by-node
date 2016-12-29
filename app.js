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
var app = express();

app.get('/', function(req, res) {
    // Let's scrape Anchorman 2
    url = 'http://zhihu.com/';
    request({
        method: 'GET',
        url: 'https://www.zhihu.com/api/v4/members/zhang-hai-26/publications?include=data%5B*%5D.cover%2Cebook_type%2Ccomment_count%2Cvoteup_count&offset=0&limit=10',
        form: {
            method: "GET",
            _xsrf: '164e9cb390a0664289dde3e92ec751d6' 
        },
        headers: {
           'Content-Type':'application/json',
            'Accept':'*/*',
            'Accept-Encoding':'gzip, deflate, sdch, br',
            'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2',
            'authorization':'Bearer Mi4wQUFBQWdUSWRBQUFBQUlJWmdDTVNDeGNBQUFCaEFsVk5ZUGVMV0FBWVdoVWhTSnZlYUhRb0ZsNVAwb1ppdU1uTlNn|1482975842|3e7ac3d55a45288245cfc010548e839681204b34',
            'Connection':'keep-alive',
            'DNT':1,
            'Host':'www.zhihu.com',
            'Referer':'https://www.zhihu.com/people/zhang-hai-26/activities',
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
            "Cookie": "q_c1=871748f1bfa244acbad02d94666c87f2|1482975825000|1482975825000; _xsrf=8131f769417c3c20fca10fc0e35bd646; l_cap_id=MjNmMDQzM2UyNDliNDFkZGI0OGFkMTZlYzE5NzBiMDc=|1482975825|6b307ff5fe87dc4738ffea8fe8ccb1fa81c4e335; cap_id=NWQyODFhYjQzNjJhNDExNTk5NjE1YzM3MGJmNmVmMzY=|1482975825|b88d465ef5aa7e8bd36ee4ad256dd7c953d8dcaf; d_c0=AACCGYAjEguPToOBsk-NCoATCaVCrvfNZDk=|1482975826; _zap=aa3321d7-bc96-42b2-a3c5-15bd92a5db5b; r_cap_id=NmQ5ZmM3M2JkMzg5NDg4ZWFmM2YwMWNiYTY1ZDRhMGE=|1482975826|03b5e74144333f32802884629531127b835cea46; login=YTU2ZWM0ZTVjZjUxNDAyZDkyZGRjYzZkYWQ4NDRhMjc=|1482975840|9c44593b677e53e3a8af39fdad3d99f60e3fbba8; n_c=1; __utma=51854390.342590642.1482975917.1482975917.1482975917.1; __utmc=51854390; __utmz=51854390.1482975917.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.100-1|2=registration_date=20130818=1^3=entry_date=20130818=1"

        },
        timeout: 1500
    }, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            console.log(html)
            var title, release, rating;
            var json = { title: "", release: "", rating: "" };

            $('.title_wrapper').filter(function() {
                var data = $(this);
                title = data.children().first().text().trim();
                release = data.children().last().children().last().text().trim();

                json.title = title;
                json.release = release;
            })

            $('.ratingValue').filter(function() {
                var data = $(this);
                rating = data.text().trim();

                json.rating = rating;
            })
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
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
