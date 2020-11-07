var http = require('http')
var fs = require('fs');

http.createServer(function(req, res) {

    if (req.url.match(/\/Arq\/[0-9]+$/)){
        var num = req.url.split('/')[2]
        fs.readFile('./site/' + num + '.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            res.write(data);
            res.end()
        })    
    }else if(req.url.match(/\/index\.html/)){
        fs.readFile('./site/index.html', function(err, data){
            console.log(err)
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
            res.write(data);
            res.end()
        }) 
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        res.write("<p> O URL não corresponde ao esperado. </p>");
        res.end()
    }
    
}).listen(7777);
console.log("Servidor à escuta na port 7777...")