
//for popover in view-flowchart button
$(document).ready(function() {
	updateTotalUnits(); // to get total units of completed courses

	$('[data-toggle="popover"]').popover({
		  trigger: 'hover',
          html: true,
          content: function () {
				return '<img class="img-fluid" src="'+$(this).data('img') + '" />';},
          title: 'Course Flowchart'
    });
});

// for log-in validation
$(document).ready(function(){
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
						$('p#pwError').text('No users found with that email/password.');
						break;								
					}
					case 500: {
						$('p#pwError').text('Server error.');
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