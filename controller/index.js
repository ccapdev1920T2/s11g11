const validator = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const studentModel = require('../models/studentsdb');
const courseModel = require('../models/coursesdb');
const classModel = require('../models/classesdb');

//constructor for a Student object
function createUser(idno, ln, fn, email, pass, degprog, college) {
	var tempUser = {
		idNum: idno,
		lname: ln,
		fname: fn,
		email: email,
		password: pass,
		degprog: degprog,
		college: college,
		compCourses: []
	};
	return tempUser;
}

//constructor for a Course object
function createCourse(cNum, cCode, cName, sec, sched, rm, fac, nUnits) {
	var tempCourse = {
		classNum: cNum,
		courseCode: cCode,
		courseName: cName,
		section: sec,
		classSched: sched,
		room : rm,
		faculty: fac,
		numUnits: nUnits
	};
	return tempCourse;
}

// searches for the User in the temporary List
function searchUser(email, pass) {
	return function(e){
	  return e.email === email && e.pass === pass;
	};
}

// searches for the Email in the temporary List
function searchEmail(email) {
	return function(e) {
		return e.email === email;
	};
}

// main functions for getting and posting data
const rendFunctions = {

	// GET methods (for rendering pages)
	getLogin: function(req, res, next) {
		var {email, password} = req.body;

		if (req.session.user){ // checks if a user is logged in
			res.redirect('/'); // navigates to home page 
		} else {
			res.render('login', { // redirects back to login if none found
			   // insert needed contents for login.hbs 
			});
		}
	},

	getRegister: function(req, res, next) {
		res.render('register', {
			// insert needed contents for register.hbs 
		});
	},

	getHome: function(req, res, next) {
		if (req.session.user) {
			res.render('home', { 
				// insert needed contents for home.hbs 
				userName: req.session.user.lname + ", " + req.session.user.fname
			});
		} else {
			res.render('home', {
					userName: "NOT FOUND"
			});
		}
	},

	getProfile: function(req, res, next) {

		studentModel.findOne({email: req.session.user.email}) // finds the logged-in student 
				.populate("courseId") // matches the ObjectId in each element of courses collection
				.then(function(student){ // passes the populated array "compCourses"
					res.render('userprofile', {
						// insert needed contents for userprofile.hbs
						userName: req.session.user.lname + ", " + req.session.user.fname,
						idNum: req.session.user.idNum,
						lname: req.session.user.lname,
						fname: req.session.user.fname,
						email: req.session.user.email,
						degprog: req.session.user.degprog,
						college: req.session.user.college,
						compCourses: JSON.parse(JSON.stringify(student.courseId)) // parses BSON into JSON (virtual attribute)
					});
				});
	},

	getCourseOffer: function(req, res, next) {

		classModel.find({}).populate('courseId')
				.then(function(classes){ // passes the populated array 

					var offers = JSON.parse(JSON.stringify(classes));
					let details = offers.map((item, i) => Object.assign({}, item, offers[i].courseId));

					res.render('view-courseoffer', {
						// insert needed contents for vieweaf.hbs 
						userName: req.session.user.lname + ", " + req.session.user.fname,
						courseOffer: details
					});
				});

	},

	getSearchCOffer: function(req, res) {
		let query = new RegExp(req.query.searchCO, 'gi'); // convery input string to regex


		// populates the collection with found matches with the query using 'lookup' flag in mongo
		classModel.aggregate([{'$lookup': {"from": "courses", "localField": "course", "foreignField": "_id", "as": "courseId"}},
					{ '$match': {$or:[{'courseId.0.courseName': query}, {'courseId.0.courseCode' : query}, {classNum : query}]} }], function(err, match) {

			if (err) { console.log(err);
				return res.status(500).end('500 Internal Server error, query not found');
			}

			let details = match.map((item, i) => Object.assign({}, item, match[i].courseId));
			res.render('view-courseoffer', {
				userName: req.session.user.lname + ", " + req.session.user.fname,
				courseOffer: details
			});
		});
	},

	getViewEAF: function(req, res, next) {

		studentModel.findOne({email: req.session.user.email}) // finds the logged-in student 
				.populate({path: 'classList',
					populate: { path: 'courseId'}
					}) // matches the ObjectId in each element of classes collection
				.then(function(student){ // passes the populated array "classList"
					
					var classes = JSON.parse(JSON.stringify(student)).classList;
					let details = classes.map((item, i) => Object.assign({}, item, classes[i].courseId));

					res.render('vieweaf', {
						// insert needed contents for vieweaf.hbs
						userName: req.session.user.lname + ", " + req.session.user.fname,
						idNum: req.session.user.idNum,
						lname: req.session.user.lname,
						fname: req.session.user.fname,
						degprog: req.session.user.degprog,
						classList: details
					});
				});
	},


	getAddClass: function(req, res, next) {
		// for searched 'Course Offerings' table
		classModel.find({}).populate('courseId').exec(function(err, match){
			// for 'My Classes' table
			studentModel.findOne({email: req.session.user.email}) 
					.populate({path: 'classList', populate: { path: 'courseId'}})
					.then(function(student){
						let classes = JSON.parse(JSON.stringify(student.classList));
						let classDetails = classes.map((item, i) => Object.assign({}, item, classes[i].courseId));
						
						let course = JSON.parse(JSON.stringify(match));
						let courseDetails = course.map((item, i) => Object.assign({}, item, course[i].courseId));
						
						res.render('addclass', {
							// insert needed contents for addclass.hbs 
							userName: req.session.user.lname + ", " + req.session.user.fname,
							courseOffer: courseDetails,
							myClasses: classDetails
						});
					});
		});
	},

	postAddClass: async function(req, res) {
		let {searchAddC} = req.body; // accessing input from POST
		
		try {
			// SEARCH
			let classObj = await classModel.findOne({classNum: searchAddC}).populate('courseId');
			
			// UPDATE
			if (classObj !== null){
				studentModel.findOneAndUpdate({email: req.session.user.email},
					{$push: {classList: classObj}}, 
					{useFindAndModify: false}, function(err) {
						if (err) 
							res.send({status: 500, mssg: 'SERVER ERROR: Cannot update class list in db.'});
					});
				res.send({status: 200, mssg: JSON.stringify(classObj)});
			}
		} catch(e){
			res.send({status: 500, mssg: 'SERVER ERROR: Cannot connect to db.'});
		}
	},

	getDropClass: function(req, res, next) {
		studentModel.findOne({email: req.session.user.email}) 
					.populate({path: 'classList', populate: { path: 'courseId'}})
					.then(function(student){
						let classes = JSON.parse(JSON.stringify(student.classList));
						let classDetails = classes.map((item, i) => Object.assign({}, item, classes[i].courseId));

						res.render('dropclass', {
							// insert needed contents for dropclass.hbs 
							userName: req.session.user.lname + ", " + req.session.user.fname,
							myClasses: classDetails
						});
					});
	},

	postDropClass: function(req, res) {
		let {searchDropC} = req.body;
		
		classModel.findOne({classNum: searchDropC}, function(err, match) {
			if (err) {
				res.send({status: 500, mssg:'Query not found.'});
			}
			
			// UPDATE
			else {
				studentModel.findOneAndUpdate({email: req.session.user.email},
							{$pull: {classList: match._id}}, 
							{useFindAndModify: false, 'new': true}, function(err) {
					if (err) res.send({status: 500, mssg:'Cannot update classlist in DB.'});
					else res.send({status: 200, mssg: 'Dropped Class Successfully!'});
				});
			}
		});
	},

	getSwapClass: function(req, res, next) {
		// for searched 'Course Offerings' table
		classModel.find({}).populate('courseId').exec(function(err, match){
			// for 'My Classes' table
			studentModel.findOne({email: req.session.user.email})
					.populate({path: 'classList', populate: { path: 'courseId'}})
					.then(function(student){
						let classes = JSON.parse(JSON.stringify(student.classList));
						let classDetails = classes.map((item, i) => Object.assign({}, item, classes[i].courseId));
						
						let course = JSON.parse(JSON.stringify(match));
						let courseDetails = course.map((item, i) => Object.assign({}, item, course[i].courseId));
						
						res.render('swapclass', {
							// insert needed contents for swapclass.hbs
							userName: req.session.user.lname + ", " + req.session.user.fname,
							courseOffer: courseDetails,
							myClasses: classDetails
						});
					});
		});
	},

	postSwapClass: function(req, res) {
		let {drop, add} = req.body; // accessing input for POST
		
		// SEARCH
		// populates the collection with found matches with the query using 'lookup' flag in mongo
		classModel.findOne({classNum: drop}, function(err, match) {
					if (err) { 
						return res.status(500).end('500 Internal Server error, query not found');
					}
					
					// UPDATE
					studentModel.findOneAndUpdate({email: req.session.user.email},
							{$pull: {classList: match._id}},
							{useFindAndModify: false, 'new': true}, function(err) {
						if (err) res.status(500).end('500, cannot update classList in db');
					});
		});
		
		// SEARCH
		// populates the collection with found matches with the query using 'lookup' flag in mongo
		classModel.findOne({classNum: add}, function(err, match) {
					if (err) {
						return res.status(500).end('500 Internal Server error, query not found');
					}
					
					// UPDATE
					studentModel.findOneAndUpdate({email: req.session.user.email},
							{$push: {classList: match}},
							{useFindAndModify: false}, function(err) {
						if (err) res.status(500).end('500, cannot update classList in db');
					});
		});
		res.redirect("/swapclass");
	},



	//POST methods (for any changes/manipulation on data)
	postRegister: function(req, res, next) {
	// retrieves user input from the register form
		var { idNum, email, fname, lname, college, degprog, password, cpass} = req.body;
		
		// looks for ERRORS
		studentModel.findOne({email: email}, function(error, match){ //searches for existing user in db
			if (error){
				return res.status(500).end("ERROR: Cannot connect to db.");
			}
			else if (match){
				return res.status(500).end("ERROR: Existing user with this email.");
			}
			
			bcrypt.hash(password, saltRounds, function(err, hash) {
				var student = createUser(idNum, lname, fname, email, hash, degprog, college);
				studentModel.create(student, function(error){
					if (error){
						return res.status(500).end("ERROR: Cannot create user.");
					}
					else {
						res.redirect("/login");
					}
				});
			});
		});
	},
	
	postLogin: function(req, res, next) {
		let { email, password } = req.body;
		
		// searches for user in db
		studentModel.findOne({email: email}, function(error, matchUser){
			if (error) // 1. Server error
				res.send({status: 500});
			else if (!matchUser) // 2. No users match with email-pass input
				res.send({status: 401});
			else { // log-in success
				bcrypt.compare(password, matchUser.password, function(err, match) {
					if (match){
						req.session.user = matchUser;
						res.send({status: 200});						
					} else
						res.send({status: 401});
				});
			}
		});
	},

	postLogout: function(req, res, next) {
		req.session.destroy();
		res.redirect("/login");
	}
};


module.exports = rendFunctions;
