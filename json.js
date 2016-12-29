var fs=require('fs');
var _=require('lodash');
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

    	fs.appendFile('zhihu/result.html',answer,'utf8',function(err){  
        if(err) throw err;  
        console.log('write JSON into TEXT');  
    });

    })
    /*
    fs.writeFile('json/result.txt',resultBuffer,function(err){  
        if(err) throw err;  
        console.log('write JSON into TEXT');  
    });
    */  
});  