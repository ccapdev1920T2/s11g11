
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

function updateTotalUnits(){
	var totalUnits = 0.0;
	document.querySelectorAll('span.num-units').forEach(function(num){
		totalUnits += Number.parseFloat(num.textContent);
	});

	$('#total-units').text(totalUnits.toFixed(1));
}