const studentModel = require('../models/studentsdb');
const courseModel = require('../models/coursesdb');
const classModel = require('../models/classesdb');

function validateEmail(email) {
    let regex = /^\w+([\.-]?\w+)*@dlsu\.edu\.ph/;
    return regex.test(email);
}

/* Three Steps
	1. parsing string, return an array of Date objects
	2. check if input Date will overlap with a class's Date
	3. loop through a student's existing classes
*/

function parseSched(sched) {
	var classSched = [];
	var arr = sched.split('/');
	
	arr.forEach(function(elem) {
		let dayTime = elem.split(' '); // separate day and time
		let times = dayTime[1].split('-'); // separate start and end time
		// hardcoded dates, so only thing that varies is the time
		var sTime = new Date('2020','01','01', times[0].substring(0,2), times[0].substring(2,4));
		var eTime = new Date('2020','01','01', times[1].substring(0,2), times[1].substring(2,4));
		classSched.push(new Sched(dayTime[0], sTime, eTime));
	});
	return classSched;
}

/* toString() method for printing the Sched object, for debugging only! */
function str(e) {
	return e.days + " "
			+ e.startTime.getHours().toString().padStart(2, '0') + ':'
			+ e.startTime.getMinutes().toString().padStart(2, '0') + ' - '
			+ e.endTime.getHours().toString().padStart(2, '0') + ':'
			+ e.endTime.getMinutes().toString().padStart(2, '0');
}

/* Sched class constructor */
// Date objects, disregard the date, use .getTime() to access it
function Sched( days, startTime, endTime ) {
	this.days = days;
	this.startTime = startTime;
	this.endTime = endTime;
}

/* returns
	TRUE if schedA overlaps schedB
	FALSE if schedA doesn't overlap schedB
*/
function isOverlap(schedA, schedB) {
	ADays = schedA.days.split('');
	BDays = schedB.days.split('');
	var dayOverlap = false;
	
	// check if any day-of-the-week overlaps (MTWHFS)
	// IMPORTANT NOTE: THIS IGNORES THE LASAREx CASE!!!
	ADays.forEach(function(day) {
		if (BDays.includes(day))
			dayOverlap = true;
	});
	
	// checking for two things: if days overlap and if time also will overlap
	return ( dayOverlap )
			&& ((schedB.startTime <= schedA.startTime && schedA.startTime <= schedB.endTime)
			|| (schedB.startTime <= schedA.endTime && schedA.endTime <= schedB.endTime));
}

// a class may have multiple schedules (e.g.: BASMATH), so check if a class will overlap with another class
function isOverlapManyScheds(arrSchedA, arrSchedB) {
	var overlap = false;
	arrSchedA.forEach(function(schedAElem) {
		for (var i = 0; i < arrSchedB.length; i++)
			if (isOverlap(schedAElem, arrSchedB[i]))
				overlap = true;
	});
	return overlap;
}

/*	NOTES:
	- studentClasses is student.classList
	- newClass is a classes object
	- the above two will come from MongoDB
	- if in case it doesn't work, try passing JSON.parse(JSON.stringify(classSched))
*/
function checkStudentSched(studentClasses, newClass, oldClass) {
	var listCopy;
	if (oldClass !== undefined) { console.log('swap detected!');
		listCopy = studentClasses.filter(function(classElem) {
			return classElem.classNum !== oldClass.classNum;
		});
	} else {
		listCopy = [...studentClasses];
	}
	console.log(listCopy);
	var newClassOverlap = false;
	listCopy.forEach(function(studClass) {
		if (isOverlapManyScheds(parseSched(studClass.classSched), parseSched(newClass.classSched)))
			newClassOverlap = true;
	});
	return newClassOverlap;
}


function isMaxUnits(sClasslist, newClass, oldClass){
	var listCopy;
	if (oldClass !== undefined) { console.log('swap detected!');
		listCopy = sClasslist.filter(function(classElem) {
			return classElem.classNum !== oldClass.classNum;
		});
	} else {
		listCopy = [...sClasslist];
	}
	console.log(listCopy);
	// 1. get total units of student
	var totalUnits = listCopy.reduce(function(a, b){
		// a = accumulator; b = current value
		return a + b.courseId[0].numUnits;
	}, 0); //start reduce from 0

	// 2. get units of class (to be added)
	// 3. check if addclass + curr units > 21 (max units)
	return newClass.courseId[0].numUnits + totalUnits > 21.0;
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
			let classObj = await classModel.findOne({classNum: searchAddC}).populate('courseId');
			if (classObj === null)
				return res.status(401).end('401 Unauthorized error, class number does not exist');

			let studClass = await studentModel.findOne({email: req.session.user.email}).populate({path: 'classList', populate: { path: 'courseId'}});
			
			// get the student match, convert BSON to JSON, then store the classList to a variable
			let classes = JSON.parse(JSON.stringify(studClass)).classList; // classList and classes are arrays
			let details = classes.map((item, i) => Object.assign({}, item, classes[i].courseId));
			
			// get an array that contains class->classNum that match the searchAddC
			let classMatch = classes.filter(function(elem) {
				return elem.classNum === searchAddC;
			});

			// if classMatch is NOT empty, that means that the class already exists in student's class list
			if (classMatch.length > 0) {
				return res.status(401).end('401 Unauthorized error, class already exists in class list');
			}
			else if (checkStudentSched(studClass.classList, classObj)) {
				return res.status(401).end('401 Unauthorized error, schedules overlap');
			}
			else if (isMaxUnits(studClass.classList, classObj)) {
				return res.status(401).end('401 Unauthorized error, student has reached max total units');
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
			let aClassObj = await classModel.findOne({classNum: add});
			if (aClassObj === null)
				return res.status(401).end('401 Unauthorized error, class number you want to add does not exist');
			
			let dClassObj = await classModel.findOne({classNum: drop});
			if (dClassObj === null)
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
			else if (checkStudentSched(studClass.classList, aClassObj, dClassObj)){
				return res.status(401).end('401 Unauthorized error, schedules overlap');
			}
			else if (isMaxUnits(studClass.classList, aClassObj, dClassObj)) {
				return res.status(401).end('401 Unauthorized error, student has reached max total units');
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