const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animosysdb', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => { console.log('classesdb Successful!'); },
		err => { console.log('classesdb Error!');
});
var db = mongoose.connection;

var classesSchema = new mongoose.Schema({
	course: {type: mongoose.Schema.Types.ObjectId, ref: 'courses'},
	classNum: Number,
	section: String,
	classSched: String,
	room: String,
	faculty_lname: String,
        faculty_fname: String
}, {collection: "classes"});

const classModel = db.model("classes", classesSchema);

module.exports = classModel;

