var express = require('express');
var router = express.Router();
var Student = require('../controllers/student')
var fs = require('fs');
var path = require('path');
const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: path.join(__dirname, "../assets/")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  Student.list()
    .then(data =>{
      console.log(data);
      res.render('students', { list: data });
    })
    .catch(err => res.render('error', {error: err}))

});

router.get('/assets/:imageFile', function(req, res) {
  res.sendFile(path.join(__dirname, "../assets", req.params.imageFile));
});




router.get('/addStudent', function(req, res, next) {
  res.render('add_student', { title: 'New Student' });
});

router.get('/students/:Id', function(req, res) {
  var id = req.params.Id
  Student.checkId(id)
    .then(data =>{
      res.render('personal_student', { student: data });
    })
    .catch(err => res.render('error', {error: err}))

});

router.get('/students/edit/:Id', function(req, res, next) {
  var id = req.params.Id

  Student.checkId(id)
    .then(data => {
      res.render('edit_student', { student: data });
    })
    .catch(err => {
      console.log("Something was wrong: ", {error: err});
    })
});

router.post(
  "/addStudent",
  upload.single("img"),
  (req, res) => {
    var body = req.body
    body.tpc = tpcsMade(body)

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../assets/", req.file.originalname);
    body.img =  req.file.originalname;
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);
      Student.insert(body)
          .then(data => {
            res.redirect('/students');
          })
          .catch(err => {
            console.log("Something was wrong: ", {error: err});
          })
    });

  }
);

router.put('/students/edit',
upload.single("img"), 
(req, res) =>  {
  var body = req.body
  
  body.tpc = tpcsMade(body)
  if(body.img != ''){
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../assets/", req.file.originalname);
    body.img =  req.file.originalname;
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);
      Student.edit(body)
      .then(data => {
        console.log(data);
        res.redirect('/students/'+ body.numero);
      })
      .catch(err => {
        console.log("Something was wrong: ", {error: err});
      })
    });
  }else{
    body.img =  'none';
    Student.edit(body)
    .then(data => {
      console.log(data);
      res.redirect('/students/'+ body.numero);
    })
    .catch(err => {
      console.log("Something was wrong: ", {error: err});
    })
  }
  
 
});

router.delete('/students/delete/:Id', function(req, res, next) {
  var id = req.params.Id

  Student.delete(id)
    .then(data => {
      Student.list()
        .then(data => {
          res.render('students', { list: data });
        })
        .catch(err => {
          console.log("Something was wrong: ", {error: err});
        })
    })
    .catch(err => {
      console.log("Something was wrong: ", {error: err});
    })
});



function tpcsMade(body) {
  tpc = [] 

  if (body.tpc1 == 'on')
    tpc.push(1)
  else
    tpc.push(0)

  if (body.tpc2 == 'on')
    tpc.push(1)
  else
    tpc.push(0)

  if (body.tpc3 == 'on')
    tpc.push(1)
  else
    tpc.push(0)

  if (body.tpc4 == 'on')
    tpc.push(1)
  else
    tpc.push(0)

  if (body.tpc5 == 'on')
    tpc.push(1)
  else
    tpc.push(0)

  if (body.tpc6 == 'on')
    tpc.push(1)
  else
    tpc.push(0)

  if (body.tpc7 == 'on')
    tpc.push(1)
  else
    tpc.push(0)

  if (body.tpc8 == 'on')
    tpc.push(1)
  else
    tpc.push(0)

  delete body.tpc1
  delete body.tpc2
  delete body.tpc3
  delete body.tpc4
  delete body.tpc5
  delete body.tpc6
  delete body.tpc7
  delete body.tpc8

  return tpc
}

module.exports = router;
