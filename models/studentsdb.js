const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://sysadmin:${process.env.DB_PASS}@animosysdb-wpwif.mongodb.net/animosysdb?retryWrites=true&w=majority`, 
				{useNewUrlParser: true, useUnifiedTopology: true})
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
	compCourses: [ String ],
	classList: [{type: mongoose.Schema.Types.ObjectId, ref: 'classes'}],
	otp: String,
	isVerified: Boolean
}, {collection: "students"});

studentsSchema.virtual('courseId', {
    ref: 'courses',
    localField: 'compCourses',
    foreignField: '_id',
    justOne: false
});
studentsSchema.set('toObject', { virtuals: true });
studentsSchema.set('toJSON', { virtuals: true });

const studentModel = db.model("students", studentsSchema);

module.exports = studentModel;
