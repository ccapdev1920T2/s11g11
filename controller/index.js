/**
 * LOG: [] all const, let, and var names must agree when using req.body
 */

//locally stores all Student and Course data
const users = [];
const courseList = [];

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
            compCourses: courseList
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
        
        if (users.filter(function(e) {
            return e.email === email;
        })) {
            console.log("TRACE: reg passed");
            users.push(createUser(idNum, lname, fname, email, password, degprog, college));
            res.redirect('/');
        }
    },
    
    postLogin: function(req, res, next) {
        console.log(req.body); 
        let { email, password } = req.body;
            // **to be changed when schema in db is created
            var foundUser = users.filter(searchUser(email, password));        

            console.log("USER Found: ", foundUser);

            // searches for only (1) user
            if (foundUser.length === 1) {
                req.session.user = foundUser[0];
                res.render('home', { 
                    userName: req.session.user.lname + ", " + req.session.user.fname
                });
            }
    
    },
    
    postLogout: function(req, res, next) {
            req.session.destroy();
            res.redirect("/login");
    },
    
    // for sample data to populate Lists
    initLists: function(req, res, next) {
        if (users.length === 0){
            users.push(createUser("11836814", 
                "MANZANO", 
                "NINNA ROBYN", 
                "ninna_manzano@dlsu.edu.ph", 
                "11111",
                "BS Information Systems", 
                "College of Computer Studies"));
            users.push(createUser("11818700", 
                "LATORRE", 
                "KAYLA DWYNETT", 
                "kayla_latorre@dlsu.edu.ph",
                "kapeuwu",
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
            courseList.push(createCourse("1544",
                "CCAPDEV", 
                "Web Application Development",
                "S11",
                "MW 1100-1230H",
                "G302A",
                "ANTIOQUIA, ARREN MATTHEW CAPUCHINO", 
                3.0));
            courseList.push(createCourse("2665",
                "ITISHCI",
                "Human Computer Interaction",
                "S14",
                "MW 0915-1045H",
                "G209",
                "ARCILLA, MARY JANE BACONG", 
                3.0));
            courseList.push(createCourse("3890",
                "ISBUSPE",
                "Business Performance Management",
                "S14",
                "TH 0915-1045H",
                "G211",
                "SIPIN, GLENN",
                3.0));
        }
            console.table(courseList);
            res.redirect('/login');
        }
        

};


module.exports = rendFunctions;