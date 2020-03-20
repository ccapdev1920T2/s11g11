const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animosysdb', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => { console.log('coursesdb Successful!'); },
		err => { console.log('coursesdb Error!');
});
var db = mongoose.connection;

var coursesSchema = new mongoose.Schema({
	courseCode: String,
	courseName: String,
	numUnits: Number
}, {collection: "courses"});

const courseModel = db.model("courses", coursesSchema);

module.exports = courseModel;

