//locally stores all Student and Course data
const users = [];
const courseList = [];


//constructor for a Student object
function createUser(idno, ln, fn, email, pass, degprog, college) {
        var tempUser = {
            idnum: idno,
            lname: ln,
            fname: fn,
            email: email,
            pass: pass,
            degprog: degprog,
            college: college
        };
        return tempUser;
}

//constructor for a Course object
function createCourse(cCode, cName, nUnits) {
        var tempCourse = {
            courseCode: cCode,
            courseName: cName,
            numUnits: nUnits
        };
        return tempCourse;
}


const rendFunctions = {
    getLogin: function(req, res, next) {
        
    },
    
    getRegister: function(req, res, next) {
        
    },
    
    getHome: function(req, res, next) {
        
    },

    getAccount: function(req, res, next) {
        
    }

};


// for sample data to fill in Lists
initLists: function(req, res, next) {
    if (users.length === 0){
        users.push(createUser("11836814", 
            "MANZANO", 
            "NINNA ROBYN", 
            "ninna_manzano@dlsu.edu.ph", 
            "12345",
            "BS Information Systems", 
            "College of Computer Studies"));
        users.push(createUser("11818700", 
            "LATORRE", 
            "KAYLA DWYNETT", 
            "kayla_latorre@dlsu.edu.ph",
            "missvanjie",
            "BS Information Systems", 
            "College of Computer Studies"));
        users.push(createUser("11847999", 
            "CALARANAN", 
            "KRESSHA MAE", 
            "krissha_calaranan@dlsu.edu.ph",
            "jazzae123",
            "BS Information Systems", 
            "College of Computer Studies"));
    }
    
    if (courseList.length === 0) {
        courseList.push(createCourse("CCAPDEV", 
            "Web Application Development", 
            3.0));
        courseList.push(createCourse("ITISHCI", 
            "Human Computer Interaction",
            3.0));
        courseList.push(createCourse("ISBUSPE", 
            "Business Performance Management", 
            3.0));

    }
};

module.exports = rendFunctions;