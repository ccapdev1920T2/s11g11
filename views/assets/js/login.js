//locally stores all Student information
var students = [];

//constructor for a Student object
function Student(email, pw) {
    this.email = email;
    this.pw = pw;
}

/**This initializes (3) elements of dummy data for testing the webpages.
 * 
 */
function initData() {
	students[0] = new Student("ninna_manzano@dlsu.edu.ph", "12345");
	students[1] = new Student("kayla_latorre@dlsu.edu.ph", "678910");
	students[2] = new Student("krissha_calaranan@dlsu.edu.ph", "00000");
	students[3] = new Student("eugene_perez@dlsu.edu.ph", "11111");
	students[4] = new Student("anna_kumiko_catahan@dlsu.edu.ph", "22222");
}

function checkStudent(){
    var val = false;
    for(var i = 0; i < 5; i++){
        if(students[i].email == $("#email").val()){
            if(students[i].pw == $("#pw").val()){
                val = true;
                return val;
            }
        }   
    }
    return val;
}

initData(); 

$(document).ready(function(){
    $("#login").click(function(){
    if($("#email").val() != "" && $("#pw").val() != "")
        if(checkStudent())
            window.location.href = "home.html";
        else
            alert("The email/password you've entered doesn't match any account!");  
    });
});