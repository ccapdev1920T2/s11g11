const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animosysdb', {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => { console.log('classesdb Successful!'); },
		err => { console.log('classesdb Error!');
});
var db = mongoose.connection;

var classesSchema = new mongoose.Schema({
	course: String,
	classNum: String,
	section: String,
	classSched: String,
	room: String,
	faculty_lname: String,
	faculty_fname: String
}, {collection: "classes"});

classesSchema.virtual('courseId', {
    ref: 'courses',
    localField: 'course',
    foreignField: '_id',
    justOne: false
});
classesSchema.set('toObject', { virtuals: true });
classesSchema.set('toJSON', { virtuals: true });

const classModel = db.model("classes", classesSchema);

module.exports = classModel;
