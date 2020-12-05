var express = require('express')
var bodyParer = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')
var upload = multer({dest : 'uploads/'})

var app = express()

//set logger
app.use(logger('dev'))

app.use(bodyParer.urlencoded({extended: false}))
app.use(bodyParer.json())
app.use(express.static('public'))

app.use(function(req, res, next) {
    console.log(JSON.stringify(req.body))
    next()
})

app.get('/', function(req, res) {
    
    var d = new Date().toISOString().substr(0, 16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files, d))
    res.end()

})

app.get('/files/upload', function(req, res) {
    var d =new Date().toISOString().substr(0, 16)
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req, res) => {
    res.download(__dirname +'/public/' + req.params.fname)
})

app.post('/files', upload.array('myFile'), function(req, res) { //multiple files -> upload.array(...) => req.files é array
    var d = new Date().toISOString().substr(0, 16)
    var files = jsonfile.readFileSync('./dbFiles.json')

    let i = 0;
    req.files.forEach(file => {
        
        let tempPath = __dirname + '/' + file.path;
        let targetPath = __dirname + "/public/" + file.originalname;
        fs.rename(tempPath, targetPath, err => {
            if (err) throw err;
        });
      
        files.push(
            {
                date: d,
                name: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                desc: req.body.desc[i]
            }
        )
        i++;
    });
   
    jsonfile.writeFileSync('./dbFiles.json', files)
    res.redirect('/')
    res.end()
})


app.listen(7701, () => console.log('Servidor à escuta na porta 7701...'))