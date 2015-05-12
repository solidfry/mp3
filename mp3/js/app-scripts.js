	
$(document).ready(function(){

	
	function updateAppTotal(appTotal){
	
		$('.appTotal h3').text(appTotal);
	
	}


	// Calculate App Totals
		
	var appTotal = 0;
	
	$('.value').on('click', function(){
	
		// Check if any other element within the view is selected
		
		var currentlySelected = $('#view').find('.selected');
		
		if (currentlySelected != ""){
			
			selectedValue = parseInt(currentlySelected.attr('data-val'));
			
			appTotal -= selectedValue;
			
			updateAppTotal(appTotal);
			
		}
	
		var clickedOption = $(this);
		
		if((clickedOption).hasClass('value')){
		
			var clickedOptionValue = parseInt(clickedOption.attr('data-val'));
			
			appTotal += clickedOptionValue;
			
			clickedOption.addClass('selected');
			
			updateAppTotal(appTotal);
		
		}
	
	});
		
		
		
});