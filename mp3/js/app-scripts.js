	
$(document).ready(function(){

	
	function updateAppTotal(appTotal){
	
		$('.appTotal h3').text(appTotal);
	
	}


	// Calculate App Totals
		
		var appTotal = 0;
		
		$('.value').on('click', function(){
			
			var clickedOption = $(this);
			
			if((clickedOption).hasClass('value')){
			
				var clickedOptionValue = parseInt(clickedOption.attr('data-val'));
				
				appTotal += clickedOptionValue;
				
				updateAppTotal(appTotal);
			
			}
		
		});
		
		
		
});		