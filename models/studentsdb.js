const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animosysdb', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => { console.log('studentsdb Successful!'); },
		err => { console.log('studentsdb Error!');
});
var db = mongoose.connection;

var studentsSchema = new mongoose.Schema({
	idNum: String,
	lname: String,
	fname: String,
	email: String,
	password: String,
	degprog: String,
	college: String,
	courseList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
}, {collection: "students"});

const studentModel = db.model("students", studentsSchema);

module.exports = studentModel;

