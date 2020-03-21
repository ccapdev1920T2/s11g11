
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
            pass: pass,
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
        res.render('userprofile', {
            // insert needed contents for userprofile.hbs 
            idNum: req.session.user.idNum,
            lname: req.session.user.lname,
            fname: req.session.user.fname,
            email: req.session.user.email,
            degprog: req.session.user.degprog,
            college: req.session.user.college,
            compCourses: req.session.user.compCourses
        });        
    },
    
    getCourseOffer: function(req, res, next) {
        console.table(courseList);
        res.render('view-courseoffer', {
            // insert needed contents for view-courseoffer.hbs
            courseOffer: courseList
        });        
    },
    
    getViewEAF: function(req, res, next) {
        res.render('vieweaf', {
            // insert needed contents for vieweaf.hbs
            idNum: req.session.user.idNum,
            lname: req.session.user.lname,
            fname: req.session.user.fname,
            degprog: req.session.user.degprog,
            compCourses: req.session.user.compCourses           
        });        
    },
    
    getAddClass: function(req, res, next) {
        res.render('addclass', {
            // insert needed contents for addclass.hbs
            courseOffer: courseList,
            myCourses: req.session.user.compCourses
        });        
    },
    
    getDropClass: function(req, res, next) {
        res.render('dropclass', {
            // insert needed contents for dropclass.hbs 
            myCourses: req.session.user.compCourses
        });        
    },
    
    getSwapClass: function(req, res, next) {
        res.render('swapclass', {
            // insert needed contents for swapclass.hbs 
            courseOffer: courseList,
            myCourses: req.session.user.compCourses            
        });        
    },
    
    //POST methods (for any changes/manipulation on data)
    postRegister: function(req, res, next) {
	// retrieves user input from the register form
        const { idNum, email, fname, lname, college, degprog, password, cpass} = req.body;

        // looks for ERRORS
        studentModel.findOne({email: email}, function(error, match){ //searches for existing user in db
            if (error){
                return res.status(500).end("ERROR: Cannot connect to db.");
            }
            else if (match){
                return res.status(500).end("ERROR: Existing user with this email.");             
            }            

            var student = createUser(idNum, lname, fname, email, password, degprog, college);

            studentModel.create(student, function(error){
                if (error){
                    return res.status(500).end("ERROR: Cannot create user.");               
                }
                else {
                    res.redirect("/login"); 
                }
            });
        });
        

        
    },
    
    postLogin: function(req, res, next) {
        console.log(req.body); 
        let { email, password } = req.body;       

        //searches for user in db
        studentModel.findOne({email: email, password: password}, function(error, match){
            if (error){
                return res.status(500).end("ERROR: No users found.");               
                res.redirect("/login");
            }
           
            if (match){
                console.log(match);
                req.session.user = match;
                res.render('home', { 
                    userName: req.session.user.lname + ", " + req.session.user.fname
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