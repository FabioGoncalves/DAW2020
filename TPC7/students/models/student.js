var mongoose = require('mongoose');


var studentSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    git: String,
    img:  String,
    tpc: [Number]
});

const studentModel = mongoose.model('student', studentSchema, "students")
module.exports = studentModel;