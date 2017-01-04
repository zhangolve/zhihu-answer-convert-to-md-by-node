var fs=require('fs');
var _=require('lodash');
var toMarkdown=require('to-markdown');
for(var j=0;j<1;j++)
{
fs.readFile('zhihu/'+j+'.json',function(err,data){  
    if(err)  
        throw err;  
          
    var jsonObj=JSON.parse(data);  
    var space=' ';  
    var newLine=' . ';  
    var chunks=[];  
    var length=0;  
      
    var data=jsonObj.data;
    console.log(data.length);
    
    _.times(data.length,function(i){
    	
    	var answer=toMarkdown(data[i].content);
        var title=data[i].question.title;
            var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]") 
            var rs = ""; 
            for (var k = 0; k < title.length; k++) { 
            rs = rs+title.substr(k, 1).replace(pattern, ''); 
            } 

            
            title=new Buffer(rs);

    	    answer=new Buffer(answer);
            var excerpt=data[i].excerpt;
           
            time=data[i].created_time+'000';
            time=parseInt(time);
            var created_time=new Date(time);
            var year=created_time.getFullYear();
            var month=created_time.getMonth()+1;
            month=(month<10?'0'+month:month);

            var day=created_time.getDate(); 
            day=(day<10?'0'+day:day);
            var hours=created_time.getHours();
            hours=(hours<10?'0'+hours:hours);
            var minutes=created_time.getMinutes();
            minutes=(minutes<10?'0'+minutes:minutes);
            var seconds='00';
            created_time=year+'-'+month+'-'+day +'   '+hours+':'+minutes+':'+seconds;
            var header='title:'+title+'\n'+'date: '+ created_time+' \n' +'categories: 知乎 \n description: '+excerpt +'\n  --- \n ' 
            header=new Buffer(header);
            fs.writeFile('zhihumd/'+title+'.md',header,'utf8',function(err){  
        if(err) throw err;  
        console.log('write JSON into ',i,'.md');  
        });
            /*
        title: 我一个自动化本科生怎么就做了前端呢？(5)
date: 2016-12-28  16:55:49 
categories: 回忆记忆
*/

    /*
    function stripscript(s) 
{ 
var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]") 
var rs = ""; 
for (var i = 0; i < s.length; i++) { 
rs = rs+s.substr(i, 1).replace(pattern, ''); 
} 
return rs; 
}


    */

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
	//var jsonObj=JSON.parse(data); 
	console.log(data);
	 var data = data.toString('utf8');  //将buffer类型的数据流转为utf-8类型的
	console.log('string', data);
	var answer=toMarkdown(data);
	console.log('markdown',answer);
	console.log(answer.length);
	fs.appendFile('zhihu/1.md',answer,'utf-8',function(err,data){
		if(err) throw err;
		console.log('success');
	})
}) ; 

*/