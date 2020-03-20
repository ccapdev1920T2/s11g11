//locally stores all Student and Course information
var students = [];
var courseList = [];
var totalunits = 0.0;

//constructor for a Student object
function Student(idno, ln, fn, email, degprog, college) {
	this.idnum = idno;
	this.lname = ln;
	this.fname = fn;
	this.email = email;
	this.degprog = degprog;
	this.college = college;
}

//constructor for a Course object
function Course(cCode, cName, nUnits) {
	this.courseCode = cCode;
	this.courseName = cName;
	this.numUnits = nUnits;
}


/**This initializes (5) elements of dummy data for testing the webpages.
 * 
 */
function initData() {
	students[0] = new Student(11836814, "MANZANO", "NINNA ROBYN", "ninna_manzano@dlsu.edu.ph", "BS Information Systems", "College of Computer Studies");
	students[1] = new Student(11818700, "LATORRE", "KAYLA DWYNETT", "kayla_latorre@dlsu.edu.ph", "BS Information Systems", "College of Computer Studies");
	students[2] = new Student(11847999, "CALARANAN", "KRESSHA MAE", "krissha_calaranan@dlsu.edu.ph", "BS Information Systems", "College of Computer Studies");
	students[3] = new Student(11818700, "PEREZ", "EUGENE", "eugene_perez@dlsu.edu.ph", "BS Information Technology", "College of Computer Studies");
	students[4] = new Student(11847999, "CATAHAN", "ANNA KUMIKO", "anna_kumiko_catahan@dlsu.edu.ph", "BS Computer Science Major In Computer Science Engineering", "College of Computer Studies");
	
	
	courseList[0] = new Course("CCAPDEV", "Web Application Development", 3.0);
	courseList[1] = new Course("ITISHCI", "Human Computer Interaction", 3.0);
	courseList[2] = new Course("ISBUSPE", "Business Performance Management", 3.0);
	courseList[3] = new Course("ISINFOM", "Transaction Management and Descriptive Analysis", 3.0);
	courseList[4] = new Course("GERPHIS", "Readings in Philippine History", 3.0);
	courseList[5] = new Course("GESPORT", "Physical Fitness and Wellness in Individual/Dual Sports", 3.0);
	courseList[6] = new Course("LCLSTWO", "Lasallian Studies 2", 1.0);
	courseList[7] = new Course("LASARE2", "Lasallian Recollection 2", 1.0);


	for(var i = 0; i < 8; i++){
		$("#course-container").append("<li class='list-group-item' id='course-unit' style='padding: 0px 0px 15px 0px;'>"
	        	+ "<div id='inline' style='width: 100%;height: 2px;background-color: #427f50;margin: 0px;'></div>"
	        	+ "<span class='float-left' style='width: 20%;margin: 10px 0px 0px 20px;'>" + courseList[i].courseCode + "</span>"
	        	+ "<span class='float-left' style='width: 53%;margin: 10px 0px 0px 10px;'>" + courseList[i].courseName + "</span>"
	        	+ "<span class='text-right float-right' style='width: 20%;margin: 10px 20px 0px 0px;'>" 
	        		+ Number.parseFloat(courseList[i].numUnits).toFixed(1) + "</span>"
	        	+ "</li>");
		//adds total units
		totalunits += courseList[i].numUnits;
	}

	//updates Total Units
	$("#total-units").text(Number.parseFloat(totalunits).toFixed(1));


	//sets (1) Student data into the page
    $("#idnum").text(students[1].idnum);
    $("#lname").text(students[1].lname);
    $("#fname").text(students[1].fname);
    $("#email").text(students[1].email);
    $("#degprog").text(students[1].degprog);
    $("#college").text(students[1].college);

}




//for popover in view-flowchart button
$(document).ready(function() {
//	$("#view-flowchart").click(function(){
		$('[data-toggle="popover"]').popover({
//	          //trigger: 'focus',
			  trigger: 'hover',
	          html: true,
	          content: function () {
					return '<img class="img-fluid" src="'+$(this).data('img') + '" />';
	          },
	          title: 'Course Flowchart'
	    });
//	});
});


$(document).ready(function() {
		initData();		
});