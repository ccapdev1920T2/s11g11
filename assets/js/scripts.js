function updateTotalUnits() {
	var totalUnits = 0.0;
	document.querySelectorAll('span.num-units').forEach(function(num){
		totalUnits += Number.parseFloat(num.textContent);
	});
	$('#total-units').text(totalUnits.toFixed(1));
}

function validDLSUid(id) {
	var acc = 0, i = 1, temp = Number.parseInt(id);
	while (Math.floor(temp) > 0) {
		acc += i*(Math.floor(temp)%10);
		temp /= 10;
		i++;
	} return acc%11 === 0 && id.length === 8;
}

function validateEmail(email) {
    let regex = /^\w+([\.-]?\w+)*@dlsu\.edu\.ph/;
    return regex.test(email);
}

$(document).ready(function() {
	// get total units of completed courses
	updateTotalUnits(); 
	
	// for popover in view-flowchart button
	$('[data-toggle="popover"]').popover({
		  trigger: 'hover',
          html: true,
          content: function () {
				return '<img class="img-fluid" src="'+$(this).data('img') + '" />';},
          title: 'Course Flowchart'
    });
	
	/* for registration validation
	 * Client-Side Validations
	 * 1. empty field
	 * 2. invalid id number
	 * 3. invalid dlsu email
	 * 4. passwords don't match
	 * 5. check password length >= 8
	 * 
	 * Server-Side Validations
	 * 1. email already exists
	 * 2. id already exists
	 */
	$('button#regsubmit').click(function() {
		var formdata = $('form#registerform').serializeArray();
		
		// sanitize form data and clear out error messages
		formdata.forEach(function(e) {
			e.value = validator.trim(e.value);
			$('#' + e.name + 'Error').text('');
		});
		
		// booleans for validation
		var noEmptyFields = true,
				validId = true,
				validEmail = true,
				passMatch = true,
				passLength = true;
		
		// #1
		formdata.forEach(function(field) {
			if (validator.isEmpty(field.value)) {
				$('#' + field.name + 'Error').text('This field is required.');
				noEmptyFields = false;
			}
		});
		
		// #2, #3, #4, #5
		if (noEmptyFields) {
			if (!validDLSUid(formdata[0].value)) {
				$('#idNumError').text('Invalid ID Number.');
				validId = false;
			}
			if (!validateEmail(formdata[1].value)) { 
				$('#emailError').text('Invalid Email. Please use a DLSU-prescribed Email.');
				validEmail = false;
			}
			if (!validator.equals(formdata[6].value, formdata[7].value)){
				$('#cpassError').text('Passwords do not match.');
				passMatch = false;
			}
			if (!validator.isLength(formdata[6].value, {min: 8})) {
				$('#passwordError').text('Passwords must be at least 8 characters long.');
				passLength = false;
			}
		}
		
		// submit form to server/backend
		if (noEmptyFields && validId && validEmail && passMatch && passLength) {
			$.post('/register', {arr: formdata}, function(result) {
				switch(result.status) {
					case 200: {
						alert(result.mssg);
						window.location.href = '/login';
						break;
					}
					case 401:
					case 500: {
						alert(result.mssg); break;
					}
				}
			});
		}
	});
	
	// for log-in validation
	$('button#login-btn').click(function() {
		var email = validator.trim($('#email').val());
		var pass = validator.trim($('#password').val());
		
		var emailEmpty = validator.isEmpty(email);
		var passEmpty = validator.isEmpty(pass);
		var emailFormat = validator.isEmail(email);
		
		// resets input form when log-in button is clicked
		$('p#emailError').text('');
		$('p#pwError').text('');
		
		if (emailEmpty){
			$('p#emailError').text('Email field must not be empty.');
		}
		else if (!emailFormat){
			$('p#emailError').text('Invalid email format.');
		}
		
		if (passEmpty){
			$('p#pwError').text('Password field must not be empty.');
		}
		
		// successful client-side validation: no empty fields and valid email
		if (!emailEmpty && emailFormat && !passEmpty){
			// passes data to the server
			$.post('/login', {email: email, password: pass}, function(res) {
				switch (res.status){
					case 200: {
						window.location.href = '/';
						break;
					}
					case 401: {
						$('p#pwError').text('Incorrect Email and/or Password.');
						break;								
					}
					case 500: {
						$('p#pwError').text('Server Error.');
						break;
					}
				}	
			});				
		}
	});
	
	$('button#addclass-btn').click(function() {
		var addClass = $('#searchAddC').val();
		
		var classEmpty = validator.isEmpty(addClass);
		var classInt = validator.isInt(addClass);
		var classLength = validator.isLength(addClass, {min: 4, max: 4});

		if (classEmpty)
			alert('No class input.');
		else if (!classInt || !classLength)
			alert('Invalid class number. Enter only 4-digit integers.');
		else {
			$.post('/addclass', {searchAddC: addClass}, function(result) {
				switch(result.status){
					case 200: {
						var newClass = JSON.parse(result.mssg);
						var classHTML = '<li class="list-group-item text-wrap text-left d-inline-block flex-row flex-nowrap">'
								+ '<span class="float-left" style="width: 20%;">' + newClass.classNum + '</span>'
								+ '<span class="float-left" style="width: 20%;">' + newClass.courseId[0].courseCode + '</span>'
								+ '<span class="float-left" style="width: 15%;">' + newClass.section + '</span>'
								+ '<span class="float-left" style="width: 30%;">' + newClass.classSched + '</span>'
								+ '<span class="float-left" style="width: 10%;">' + newClass.room + '</span></li>';
						$('#addedclasses').append(classHTML);
						break;
					}
					case 401: {
						alert(result.mssg);
						break;
					}
					case 500: {
						alert(result.mssg);
						break;
					}
				}
			});
		}
		
		
	});

	$('button.delete-class').click(function() {
		var row = $(this).parent();
		var delClassNum = row.attr("id");

		$.post('/dropclass', {searchDropC: delClassNum}, function(result) {
			switch(result.status){
				case 200: {
					alert(result.mssg);
					row.remove();
					break;
				}
				case 401: {
					alert(result.mssg);
					break;
				}
				case 500: {
					alert(result.mssg);
					break;
				}
			}
		});
	});
});
