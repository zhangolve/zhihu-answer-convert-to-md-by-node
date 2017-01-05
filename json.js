let fs=require('fs');
let _=require('lodash');
let toMarkdown=require('to-markdown');
let dir = './zhihumd';


for(let j=0;j<15;j++)
{
    if (!fs.existsSync('lishuhang/'+j+'.json')){
           break;
            }

fs.readFile('lishuhang/'+j+'.json',function(err,res){  
    if(err)  
        throw err;  
          
    let jsonObj=JSON.parse(res);  
    let space=' ';  
    let newLine=' . ';  
    let chunks=[];  
    let length=0;  
      
    let data=jsonObj.data;
    console.log(data.length);
    
    _.times(data.length,function(i){
    	
    	let answer=toMarkdown(data[i].content);
        let title=data[i].question.title;
            let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]") 
            let rs = ""; 
            for (let k = 0; k < title.length; k++) { 
            rs = rs+title.substr(k, 1).replace(pattern, ''); 
            } 

            
            title=new Buffer(rs);

    	    answer=new Buffer(answer);
            let excerpt=data[i].excerpt;
           
            time=data[i].created_time+'000';
            time=parseInt(time);
            let created_time=new Date(time);
            let year=created_time.getFullYear();
            let month=created_time.getMonth()+1;
            month=(month<10?'0'+month:month);

            let day=created_time.getDate(); 
            day=(day<10?'0'+day:day);
            let hours=created_time.getHours();
            hours=(hours<10?'0'+hours:hours);
            let minutes=created_time.getMinutes();
            minutes=(minutes<10?'0'+minutes:minutes);
            let seconds='00';
            created_time=year+'-'+month+'-'+day +'   '+hours+':'+minutes+':'+seconds;
            let header='title:'+title+'\n'+'date: '+ created_time+' \n' +'categories: 知乎 \n description: '+excerpt +'\n  --- \n ' 
            header=new Buffer(header);
           if (!fs.existsSync(dir)){
           fs.mkdirSync(dir);
            }
            //如果没有指定目录，创建之
            fs.writeFile('zhihumd/'+title+'.md',header,'utf8',function(err){  
        if(err) throw err;  
        console.log('write JSON into ',i,'.md');  
        });
    	fs.appendFile('zhihumd/'+title+'.md',answer,'utf8',function(err){  
        if(err) throw err;  
        console.log('write JSON into ',i,'.md');  
    });

    })

});
}
/*
fs.readFile('zhihu/1.html',function(err,data){
	if(err) throw err;
	//let jsonObj=JSON.parse(data); 
	console.log(data);
	 let data = data.toString('utf8');  //将buffer类型的数据流转为utf-8类型的
	console.log('string', data);
	let answer=toMarkdown(data);
	console.log('markdown',answer);
	console.log(answer.length);
	fs.appendFile('zhihu/1.md',answer,'utf-8',function(err,data){
		if(err) throw err;
		console.log('success');
	})
}) ; 

*/