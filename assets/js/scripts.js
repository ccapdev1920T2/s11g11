
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

		console.log(delClassNum);

		$.post('/dropclass', {searchDropC: delClassNum}, function(result) {
			switch(result.status) {
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

	$('button#swapclass-btn').click(function() {
		var addC =  $('#add').val();
		var dropC =  $('#drop').val();

		var addCEmpty = validator.isEmpty(addC);
		var addCInt = validator.isInt(addC);
		var addCLength = validator.isLength(addC, {min: 4, max: 4});

		var dropCEmpty = validator.isEmpty(dropC);
		var dropCInt = validator.isInt(dropC);
		var dropCLength = validator.isLength(dropC, {min: 4, max: 4});

		if (addCEmpty && dropCEmpty)
			alert('No input.');
		else if (addCEmpty)
			alert('No input for class to add.');
		else if (dropCEmpty)
			alert('No input for class to drop.');
		else if (!addCInt || !addCLength || !dropCInt || !dropCLength)
			alert('Invalid class number/s. Enter only 4-digit integers.');
		else {
			$.post('/swapclass', {add: addC, drop: dropC}, function(result) {
				switch(result.status){
					case 200: {
						var newClass = JSON.parse(result.mssg);
						var classHTML = '<li class="list-group-item text-wrap text-left d-inline-block flex-row flex-nowrap">'
								+ '<span class="float-left" style="width: 20%;">' + newClass.classNum + '</span>'
								+ '<span class="float-left" style="width: 20%;">' + newClass.courseId[0].courseCode + '</span>'
								+ '<span class="float-left" style="width: 15%;">' + newClass.section + '</span>'
								+ '<span class="float-left" style="width: 30%;">' + newClass.classSched + '</span>'
								+ '<span class="float-left" style="width: 10%;">' + newClass.room + '</span></li>';
						$('#myclasses_swap').append(classHTML);
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
});

function updateTotalUnits(){
	var totalUnits = 0.0;
	document.querySelectorAll('span.num-units').forEach(function(num){
		totalUnits += Number.parseFloat(num.textContent);
	});

	$('#total-units').text(totalUnits.toFixed(1));
}
