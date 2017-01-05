const fs = require('fs');
const _ = require('lodash');
const toMarkdown = require('to-markdown');
const dir = './zhihumd';
for (let j = 0; j < 15; j++) {
  if (!fs.existsSync(`lishuhang/${j}.json`)) {
    break;
  }

  fs.readFile(`lishuhang/${j}.json`, (err, res) => {
    if (err) {
      throw err;
    }

    const jsonObj = JSON.parse(res);
    const space = ' ';
    const newLine = ' . ';
    const chunks = [];
    const length = 0;

    const data = jsonObj.data;
    console.log(data.length);

    _.times(data.length, (i) => {
      let answer = toMarkdown(data[i].content);
      let title = data[i].question.title;
      const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
      let rs = '';
      for (let k = 0; k < title.length; k++) {
        rs += title.substr(k, 1).replace(pattern, '');
      }


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
      let header = `title:${title}\n` + `date: ${formatTime} \n` + `categories: 知乎 \n description: ${excerpt}\n  --- \n `;
      header = new Buffer(header);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
            // 如果没有指定目录，创建之
      fs.writeFile(`zhihumd/${title}.md`, header, 'utf8', (err) => {
        if (err) throw err;
        console.log('write JSON into ', i, '.md');
      });
      fs.appendFile(`zhihumd/${title}.md`, answer, 'utf8', (err) => {
        if (err) throw err;
        console.log('write JSON into ', i, '.md');
      });
    });
  });
}
