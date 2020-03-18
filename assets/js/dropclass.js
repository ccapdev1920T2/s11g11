var courseList = [];

//constructor for a Course object
function Course(cNum, cCode, cName, sec, cSched, rm, fac, nUnits) {
	this.classNum = cNum;
	this.courseCode = cCode;
	this.courseName = cName;
	this.section = sec;
	this.classSched = cSched;
	this.room = rm;
}


/**This initializes (5) elements of dummy data for testing the webpages.
 * 
 */
function initData() {
	
	//classNum, courseCode, courseName, section, classSched, room, faculty, numUnits
	courseList[0] = new Course(1544, "CCAPDEV", "Web Application Development", "S11", "MW 1100-1230H", "G302A");
	courseList[1] = new Course(2665, "ITISHCI", "Human Computer Interaction", "S14", "MW 0915-1045H", "G209");
	courseList[2] = new Course(3890, "ISBUSPE", "Business Performance Management", "S14", "TH 0915-1045H", "G211");
	courseList[3] = new Course(3418, "INFOM", "Transaction Management and Descriptive Analytics", "S14", "TH 1100-1230H", "G302A");
	courseList[4] = new Course(2578, "GERPHIS", "Readings in Philippine History", "S12", "MW 0730-0900H", "G205", "DELA CRUZ, ARLEIGH ROSS DY", 3.0);
	courseList[5] = new Course(3427, "GESPORT", "Physical Fitness and Wellness in Individual/Dual Sports", "S16", "W 1300-1500H", "ER7B");
	courseList[6] = new Course(683, "LCLSTWO", "Lasallian Studies 2", "S11", "M 1430-1630H", "G203");
	courseList[7] = new Course(2536, "LASARE2", "Lasallian Recollection 2", "S11", "FEB01", "A1203");


	for(var i = 0; i < 7; i++){
		$("#myclasses").append("<li class='list-group-item text-left d-inline-block flex-row'>"
				+ "<span class='float-left' style='width: 10%;padding: 10px 10px 10px 10px;height: 24px;'>" + courseList[i].classNum + "</span>"
				+ "<span class='float-left' style='width: 10%;padding: 10px 10px 10px 10px;height: 24px;'>" + courseList[i].courseCode + "</span>"
				+ "<span class='text-left float-left' style='width: 30%;padding: 10px 10px 10px 10px;''>" + courseList[i].courseName + "</span>"
				+ "<span class='float-left' style='width: 10%;padding: 10px;'>" + courseList[i].section + "</span>"
				+ "<span class='float-left' style='padding: 10px;width: 20%;'>" + courseList[i].classSched + "</span>"
				+ "<span class='float-left' style='padding: 10px;width: 10%;'>" + courseList[i].room + "</span>"
				+ "<button class='btn btn-primary float-left' type='button' style='width: 5%;padding: 2px;background-color: #427f50;'>" + "Drop" + "</button>"
      				+ "</li>" );
	}
	

                    
                
}

$(document).ready(function() {
		initData();		
});