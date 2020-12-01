var Student = require('../models/student')

module.exports = {
    list() {
        return Student
            .find()
            .sort({nome:1})
            .exec()
    },
    
    checkId (id) {
        return Student
            .find()
            .findOne({numero: id})
            .exec()
    },

    insert (student) {
        var newStudent = new Student(student)
        return newStudent.save()
    },
    edit(student) {
        return Student 
            .update({numero: student.numero}, {$set: {nome: student.nome, git: student.git, tpc: student.tpc, img: student.img}})
            .exec()
    },
    delete(id) {
        return Student 
            .deleteOne({numero: id})
            .exec()
    } 
}