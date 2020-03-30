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
		let {idNum, email, fname, lname, college, degprog, password, cpass} = req.body;

		if(!idNum || !email || !fname || !lname || !college || !degprog || !password || !cpass) {
			return res.status(401).end('401 Unauthorized error, missing input');
		}
		else if(!validateEmail(email)) {
			return res.status(401).end('401 Unauthorized error, invalid email');
		}
		else if(password !== cpass) {
			return res.status(401).end('401 Unauthorized error, passwords do not match');
		}
		else {
			//searches if user is already in db
			studentModel.findOne({email: email}, function(error, match){
				if (error){
					return res.status(500).end("401 Unauthorized error, cannot connect to the db");     
				}

				if (match){
					return res.status(401).end("401 Unauthorized error, email already in database");
				}
			});      
		}  
		next();        
	},

	validateAddClass: async function (req, res, next) {
		let {searchAddC} = req.body;

		if(!searchAddC)
			return res.status(401).end('401 Unauthorized error, missing input');

		else{
			let classNumber = await classModel.findOne({classNum: searchAddC});
			if (classNumber === null)
				return res.status(401).end('401 Unauthorized error, class number does not exist');

			let studClass = await studentModel.findOne({email: req.session.user.email}).populate('classList');
			
			// get the student match, convert BSON to JSON, then store the classList to a variable
			let classes = JSON.parse(JSON.stringify(studClass)).classList; // classList and classes are arrays

			// get an array that contains class->classNum that match the searchAddC
			let classMatch = classes.filter(function(elem) {
				return elem.classNum === searchAddC;
			});

			// if classMatch is NOT empty, that means that the class already exists in student's class list
			if (classMatch.length > 0) {
				return res.status(401).end('401 Unauthorized error, class already exists in class list');
			}
			else return next();
		} 
	},

	validateDropClass: async function (req, res, next) {
		let {searchDropC} = req.body;

		if(!searchDropC)
			return res.status(401).end('401 Unauthorized error, missing input');

		else{
			let classNumber = await classModel.findOne({classNum: searchDropC});
			if (classNumber === null)
				return res.status(401).end('401 Unauthorized error, class number does not exist');

			let studClass = await studentModel.findOne({email: req.session.user.email}).populate('classList');
			
			// get the student match, convert BSON to JSON, then store the classList to a variable
			let classes = JSON.parse(JSON.stringify(studClass)).classList; // classList and classes are arrays

			// get an array that contains class->classNum that match the searchDropC
			let classMatch = classes.filter(function(elem) {
				return elem.classNum === searchDropC;
			});

			// if classMatch is empty, that means that the class does not exist in student's class list
			if (classMatch.length === 0) {
				return res.status(401).end('401 Unauthorized error, class does not exist in class list');
			}
			else return next();
		}
	},
	
	validateSwapClass: async function (req, res, next) {
		let {add, drop} = req.body;

		if(!drop || !add)
			return res.status(401).end('401 Unauthorized error, missing input');

		else{
			let aClassNumber = await classModel.findOne({classNum: add});
			if (aClassNumber === null)
				return res.status(401).end('401 Unauthorized error, class number you want to add does not exist');
			
			let dClassNumber = await classModel.findOne({classNum: drop});
			if (dClassNumber === null)
				return res.status(401).end('401 Unauthorized error, class number you want to drop does not exist');

			let studClass = await studentModel.findOne({email: req.session.user.email}).populate('classList');
			
			// get the student match, convert BSON to JSON, then store the classList to a variable
			let classes = JSON.parse(JSON.stringify(studClass)).classList; // classList and classes are arrays

			// get an array that contains class->classNum that match the add
			let addMatch = classes.filter(function(elem) {
				return elem.classNum === add;
			});
			
			// get an array that contains class->classNum that match the drop
			let dropMatch = classes.filter(function(elem) {
				return elem.classNum === drop;
			});

			// if addMatch is NOT empty, that means that the class already exists in student's class list
			if (addMatch.length > 0) {
				return res.status(401).end('401 Unauthorized error, class to add already exists in class list');
			}
			
			// if dropMatch is empty, that means that the class does not exist in student's class list
			else if (dropMatch.length === 0) {
				return res.status(401).end('401 Unauthorized error, class to drop does not exist in class list');
			}
			
			else return next();
		}
	}

};

module.exports = animoMiddleware;