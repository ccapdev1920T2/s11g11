//locally stores all Course information
var courseList = [];

//constructor for a Course object
function Course(cNum, cCode, cName, sec, cSched, rm, fac, nUnits) {
	this.classNum = cNum;
	this.courseCode = cCode;
	this.courseName = cName;
	this.section = sec;
	this.classSched = cSched;
	this.room = rm;
	this.faculty = fac;
	this.numUnits = nUnits;
}


/**This initializes (5) elements of dummy data for testing the webpages.
 * 
 */
function initData() {
	
	//classNum, courseCode, courseName, section, classSched, room, faculty, numUnits
	courseList[0] = new Course(1544, "CCAPDEV", "Web Application Development", "S11", "MW 1100-1230H", "G302A", "ANTIOQUIA, ARREN MATTHEW CAPUCHINO", 3.0);
	courseList[1] = new Course(2665, "ITISHCI", "Human Computer Interaction", "S14", "MW 0915-1045H", "G209", "ARCILLA, MARY JANE BACONG", 3.0);
	courseList[2] = new Course(3890, "ISBUSPE", "Business Performance Management", "S14", "TH 0915-1045H", "G211", "SIPIN, GLENN", 3.0);
	courseList[3] = new Course(3418, "ISINFOM", "Transaction Management and Descriptive Analytics", "S14", "TH 1100-1230H", "G302A", "MALABANAN, OLIVER ARCIAGA", 3.0);
	courseList[4] = new Course(2578, "GERPHIS", "Readings in Philippine History", "S12", "MW 0730-0900H", "G205", "DELA CRUZ, ARLEIGH ROSS DY", 3.0);
	courseList[5] = new Course(3427, "GESPORT", "Physical Fitness and Wellness in Individual/Dual Sports", "S16", "W 1300-1500H", "ER7B", "PANLILIO, ROLANDO MENDOZA", 3.0);
	courseList[6] = new Course(683, "LCLSTWO", "Lasallian Studies 2", "S11", "M 1430-1630H", "G203", "UNSON, CESAR J.", 1.0);
	courseList[7] = new Course(2536, "LASARE2", "Lasallian Recollection 2", "S11", "FEB01", "A1203", "MAÑEZ, JAMES EMERSON LACAP", 1.0);

	//appends (7) courses into the table
	for(var i = 0; i < 8; i++){
		$("#co-body").append("<tr class='courseoffer-row'>"
                        + "<td class='border rounded-0'>" + courseList[i].classNum + "</td>"
                        + "<td class='border rounded-0'>" + courseList[i].courseCode + "</td>"
                        + "<td class='border rounded-0'>" + courseList[i].courseName + "</td>"
                        + "<td class='text-right border rounded-0'>" + courseList[i].section + "</td>"
                        + "<td class='text-left border rounded-0'>" + courseList[i].classSched + "</td>"
                        + "<td class='text-left border rounded-0'>" + courseList[i].room + "</td>"
                        + "<td class='text-left border rounded-0'>" + courseList[i].faculty + "</td>"
                        + "<td class='text-right border rounded-0'>" + Number.parseFloat(courseList[i].numUnits).toFixed(1) + "</td>"
                    + "</tr>");
	}
}


$(document).ready(function() {
		initData();		
});