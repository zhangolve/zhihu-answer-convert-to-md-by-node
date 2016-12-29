var fs=require('fs');
fs.readFile('zhihu/1.json',function(err,data){  
    if(err)  
        throw err;  
          
    var jsonObj=JSON.parse(data);  
    var space=' ';  
    var newLine=' . ';  
    var chunks=[];  
    var length=0;  
      
    
    fs.writeFile('json/result.txt',resultBuffer,function(err){  
        if(err) throw err;  
        console.log('write JSON into TEXT');  
    });  
});  