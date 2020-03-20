//locally stores all Student and Course information
var students = [];
var courseList = [];

function Student(idno, ln, fn, email, degprog, college) {
	this.idnum = idno;
	this.lname = ln;
	this.fname = fn;
	this.email = email;
	this.degprog = degprog;
	this.college = college;
}

//constructor for a Course object
function Course(cCode, cName, section, cSched, room, nUnits) {
	this.courseCode = cCode;
	this.courseName = cName;
	this.section = section;
	this.classSched = cSched;
	this.room = room;
	this.numUnits = nUnits;
}


function initData() {
	students[0] = new Student(11836814, "MANZANO", "NINNA ROBYN", "ninna_manzano@dlsu.edu.ph", "BS Information Systems", "College of Computer Studies");
	students[1] = new Student(11818700, "LATORRE", "KAYLA DWYNETT", "kayla_latorre@dlsu.edu.ph", "BS Information Systems", "College of Computer Studies");
	students[2] = new Student(11847999, "CALARANAN", "KRESSHA MAE", "krissha_calaranan@dlsu.edu.ph", "BS Information Systems", "College of Computer Studies");
	students[3] = new Student(11818700, "PEREZ", "EUGENE", "eugene_perez@dlsu.edu.ph", "BS Information Technology", "College of Computer Studies");
	students[4] = new Student(11847999, "CATAHAN", "ANNA KUMIKO", "anna_kumiko_catahan@dlsu.edu.ph", "BS Computer Science Major In Computer Science Engineering", "College of Computer Studies");
	
	courseList[0] = new Course("CCAPDEV", "Web Application Development", "S11", "MW 11:00-12:30", "G304B", 3.0);
	courseList[1] = new Course("ITISHCI", "Human Computer Interaction", "S14", "MW 9:15-10:45", "G209", 3.0);
	courseList[2] = new Course("ISBUSPE", "Business Performance Management", "S14", "TH 9:15-10:45", "G211", 3.0);
	courseList[3] = new Course("GERPHIS", "Readings in Philippine History", "S12", "MW 7:30-9:00", "G205", 3.0);
	courseList[4] = new Course("GESPORT", "Physical Fitness and Wellness in Individual/Dual Sports", "S11", "W 13:00-15:00", "ER7B", 3.0);
	courseList[5] = new Course("LCLSTWO", "Lasallian Studies 2", "S11", "H 13:00-15:00", "G210", 1.0);
	courseList[6] = new Course("LASARE2", "Lasallian Recollection 2", "S11", "Feb 08, 2020", "A1203", 1.0);

	for(var i = 0; i < 7; i++){
		$("#enrolledclasses").append("<li class='list-group-item'>"
				+ "<span class='float-left' style='width: 15%;'>" + courseList[i].courseCode + "</span>"
	        	+ "<span class='float-left' style='width: 35%;'>" + courseList[i].courseName + "</span>"
	        	+ "<span class='float-left' style='width: 10%;'>" + courseList[i].section + "</span>"
	        	+ "<span class='float-left' style='width: 20%;'>" + courseList[i].classSched + "</span>"
				+ "<span class='float-left' style='width: 10%;'>" + courseList[i].room + "</span>"
				+ "<span class='float-left' style='width: 10%;'>" + courseList[i].numUnits + "</span>"
				+ "</li>" );
	}
	

    $("#idnum").text(students[1].idnum);
    $("#lname").text(students[1].lname);
    $("#fname").text(students[1].fname);
    $("#degprog").text(students[1].degprog);
}

$(document).ready(function() {
		initData();		
});