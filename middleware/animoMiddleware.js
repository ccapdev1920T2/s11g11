const studentModel = require('../models/studentsdb');
const courseModel = require('../models/coursesdb');
const classModel = require('../models/classesdb');

function validateEmail(email) {
	let regex = /^\w+([\.-]?\w+)*@dlsu\.edu\.ph/;
	return regex.test(email);
}

const animoMiddleware = {
	validateLogin: function (req, res, next) {
		let {email, password} = req.body;

		if(!email) {
			return res.status(401).end('401 Unauthorized error, no email');
		}
		else if(!validateEmail(email)) {
			return res.status(401).end('401 Unauthorized error, invalid email');
		}
		if(!password) {
			return res.status(401).end('401 Unauthorized error, no password');
		}
		next();
	},
	
	validateRegister: function (req, res, next) {
		let {idNum, email, fName, lName, college, degree, password, conPass} = req.body;
		 
		if(!idNum || !email || !fName || !lName || !college || !degree || !password || !conPass) {
			return res.status(401).end('401 Unauthorized error, missing input');
		}
		else if(!validateEmail(email)) {
			return res.status(401).end('401 Unauthorized error, invalid email');
		}
		else if(password !== conPass) {
			return res.status(401).end('401 Unauthorized error, passwords do not match');
		}
		else next();        
	},
	
	validateAddClass: function (req, res, next) {
		let {searchAddC} = req.body;

		if(!searchAddC)
				return res.status(401).end('401 Unauthorized error, missing input');
		
		else{
			classModel.findOne({classNum: searchAddC}, function(err, match) {
				if(err)
					return res.status(500).end('500 Server error, cannot connect to db');
				else if (!match)
					return res.status(401).end('401 Unauthorized error, class number does not exist');
			});
			studentModel.findOne({email: req.session.user.email})
					.populate('classList')
					.then(function(err, match) {
				// get the student match, convert BSON to JSON, then store the classList to a variable
				let classes = JSON.parse(JSON.stringify(match)).classList; // classList and classes are arrays
				
				// get an array that contains class->classNum that match the searchAddC
				let classMatch = classes.filter(function(elem) {
					return elem.classNum === searchAddC;
				});
				
				// if classMatch is NOT empty, that means that the class already exists in student's class list
				if (classMatch.length > 0) {
					return res.status(401).end('401 Unauthorized error, class already exists in class list');
				}
			});
		}
		next();
	}
};

module.exports = animoMiddleware;