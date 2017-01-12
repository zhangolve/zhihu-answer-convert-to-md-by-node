const fs = require('fs');
const _ = require('lodash');
const toMarkdown = require('to-markdown');

const config = require('./config.js');
const dir = `./${config.zhihuId}md`;
for (let j = 0; j < 1000000; j++) {
    if (!fs.existsSync(`${config.zhihuId}/${j}.json`)) {
        break;
    }

    fs.readFile(`${config.zhihuId}/${j}.json`, (err, res) => {
        if (err) {
            throw err;
        }
        const jsonObj = JSON.parse(res);
        const data = jsonObj.data;
        _.times(data.length, (i) => {
            let answer = toMarkdown(data[i].content);
            const reg = /<noscript>.*?<\/noscript>/g;
            const reg2 = /src="(.*?)"/;
            let src = answer.match(reg);
            const imageList = [];
            src = _.compact(src); // 使用lodash ，即便是src为null也能够转为空的数组
            _.times(src.length, (imageNum) => { imageList.push(`![](${src[imageNum].match(reg2)[1]})`); });
            _.times(src.length, (imageNum) => { answer = answer.replace(src[j], imageList[j]); });
            let title = data[i].question.title;
            const pattern = new RegExp("[`~!@#$^&'*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
            let rs = '';
            _.times(title.length, (k) => {
                const rs2 = title.substr(k, 1).replace(/\"/, ''); // 使用正则表达式单独去除双引号
                rs += rs2.replace(pattern, '');
            });
            title = new Buffer(rs);

            answer = new Buffer(answer);
            const excerpt = data[i].excerpt;

            let time = `${data[i].created_time}000`;

            time = parseInt(time);
            const createdTime = new Date(time);
            const year = createdTime.getFullYear();
            let month = createdTime.getMonth() + 1;
            month = (month < 10 ? `0${month}` : month);
            let day = createdTime.getDate();
            day = (day < 10 ? `0${day}` : day);
            let hours = createdTime.getHours();
            hours = (hours < 10 ? `0${hours}` : hours);
            let minutes = createdTime.getMinutes();
            minutes = (minutes < 10 ? `0${minutes}` : minutes);
            const seconds = '00';
            const formatTime = `${year}-${month}-${day}   ${hours}:${minutes}:${seconds}`;
            const questionId = data[i].question.id;
            const answerId = data[i].id;
            let copyRight = `\n\n知乎原文: [${title}](https://www.zhihu.com/question/${questionId}/answer/${answerId})`;
            let header = `title: ${title}\n` + `date: ${formatTime} \n` + 'categories: 知乎 \ndescription:  \n \n---\n\n\n ';
            header = new Buffer(header);
            copyRight = new Buffer(copyRight);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            // 如果没有指定目录，创建之
            fs.writeFile(`${dir}/${title}.md`, header, 'utf8', (err) => {
                if (err) throw err;
                // console.log('', i, '.md');
            });
            fs.appendFile(`${dir}/${title}.md`, answer + copyRight, 'utf8', (err) => {
                if (err) throw err;
                // console.log('write JSON into ', i, '.md');
            });
        });
    });
}
console.log('done!');
