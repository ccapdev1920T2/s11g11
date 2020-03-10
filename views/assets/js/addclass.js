//locally stores all Course information
var courseList = [];
var classoffers = [];

//constructor for a Course object
//constructor for a Course object
function Course(cNum, cCode, section, cSched, room) {
	this.classNum = cNum;
	this.courseCode = cCode;
	this.section = section;
	this.classSched = cSched;
	this.room = room;
}


function initData() {
	
	courseList[0] = new Course(1544, "CCAPDEV", "S11", "MW 11:00-12:30", "G304B");
	courseList[1] = new Course(2665, "ITISHCI", "S14", "MW 9:15-10:45", "G209");
	courseList[2] = new Course(3890, "ISBUSPE", "S14", "TH 9:15-10:45", "G211");
	courseList[3] = new Course(3418, "GERPHIS", "S12", "MW 7:30-9:00", "G205");
	courseList[4] = new Course(3427, "GESPORT", "S11", "W 13:00-15:00", "ER7B");
	courseList[5] = new Course(683, "LCLSTWO", "S11", "H 13:00-15:00", "G210");
	courseList[6] = new Course(2536, "LASARE2", "S11", "Feb 08, 2020", "A1203");
	courseList[7] = new Course(3427, "GESPORT", "S16", "W 1300-1500H", "ER7B");

	classoffers[0] = new Course(3427, "GESPORT", "S15", "H 18:00-20:00", "ER7B");
	classoffers[1] = new Course(2665, "ITISHCI", "S14", "MW 9:15-10:45", "G209");
	classoffers[2] = new Course(3890, "ISBUSPE", "S14", "TH 9:15-10:45", "G211");
	classoffers[3] = new Course(3418, "GERPHIS", "S12", "MW 7:30-9:00", "G205");
	classoffers[4] = new Course(3427, "GESPORT", "S11", "W 13:00-15:00", "ER7B");
	classoffers[5] = new Course(683, "LCLSTWO", "S11", "H 13:00-15:00", "G210");
	classoffers[6] = new Course(2536, "LASARE2", "S11", "Feb 08, 2020", "A1203");
	classoffers[7] = new Course(3427, "GESPORT", "S16", "W 1300-1500H", "ER7B");
	classoffers[8] = new Course(3418, "GERPHIS", "S13", "MW 9:15-10:45", "G205");
	classoffers[9] = new Course(1544, "CCAPDEV", "S11", "MW 11:00-12:30", "G304B");


	for(var i = 0; i < 10; i++){
		$("#classoffers").append("<li class='list-group-item'>"
				+ "<span class='float-left' style='width: 15%;'>" + classoffers[i].classNum + "</span>"
	        	+ "<span class='float-left' style='width: 25%;'>" + classoffers[i].courseCode + "</span>"
	        	+ "<span class='float-left' style='width: 15%;'>" + classoffers[i].section + "</span>"
	        	+ "<span class='float-left' style='width: 25%;'>" + classoffers[i].classSched + "</span>"
				+ "<span class='float-left' style='width: 10%;'>" + classoffers[i].room + "</span>"
				+ "<button class='btn btn-primary text-center float-right' type='submit' style='font-family: Roboto, sans-serif;background-color: #427f50;padding: 2px;margin: 0px;width: 10%;'>"
				+ "Add </button> </li>");
		$("#addedclasses").append("<li class='list-group-item text-nowrap text-left d-inline-block flex-row flex-nowrap'>"
	        	+ "<span class='float-left' style='width: 30%; padding: 10px; height: 24px;'>" + courseList[i].courseCode + "</span>"
	        	+ "<span class='float-left' style='width: 15%; padding: 10px;'>" + courseList[i].section + "</span>"
	        	+ "<span class='float-left' style='width: 35%; padding: 10px;'>" + courseList[i].classSched + "</span>"
				+ "<span class='float-left' style='width: 10%; padding: 10px;'>" + courseList[i].room + "</span>"
				+ "</li>");
	}


                
}


$(document).ready(function() {
		initData();		
});