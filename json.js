var fs=require('fs');
var _=require('lodash');
var toMarkdown=require('to-markdown');
/*
fs.readFile('zhihu/1.json',function(err,data){  
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
    	var answer=new Buffer(data[i].content);

    	fs.appendFile('zhihu/'+i+'.html',answer,'utf8',function(err){  
        if(err) throw err;  
        console.log('write JSON into ',i,'.html');  
    });

    })

});

*/
fs.readFile('zhihu/1.html',function(err,data){
	if(err) throw err;
	//var jsonObj=JSON.parse(data); 
	console.log(data);
	 var data = data.toString('utf8');
	console.log('string', data);
	var answer=toMarkdown(data);
	console.log('markdown',answer);
}) ; 

