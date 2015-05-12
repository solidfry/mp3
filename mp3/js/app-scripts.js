	
$(document).ready(function(){

	
	function updateAppTotal(value){
	
		console.log('The current total is ' + $('#' + value[0] + '-total').text());
	
		appTotal = $('#' + value[0] + '-total').text();
		appTotal = appTotal.split('$');
		appTotal = parseInt(appTotal[1]);
	
		if (value[2] == "selected"){
		
			console.log('Something was already selected');
	
			appTotal -= parseInt(value[1]);
		
		}
		
		else {
		
			appTotal += parseInt(value[1]);
		
		}
		
		 $('#' + value[0] + '-total')
			.addClass('animated flipOutX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				
				$(this).html('&#36;' + appTotal).removeClass('animated flipOutX').addClass('animated flipInX');
			
			});
	
	}

	// Calculate App Totals
		
	var appTotal = 0;
	
	$('.value').on('click', function(e){
	
		// Check if any other element within the view is selected
		
		var currentlySelected = $('.selected');
		
		if (currentlySelected.length !== 0){
		
			selectedValue = currentlySelected.attr('data-val');
			selectedValue = selectedValue.split('-');
			
			selectedValue[selectedValue.length] = "selected";
			
			console.dir(selectedValue);
			
			updateAppTotal(selectedValue);
			
			currentlySelected.removeClass('selected');
			
		}
	
		var clickedOption = $(this);
		
		var clickedOptionValue = clickedOption.attr('data-val');
		
		clickedOptionValue = clickedOptionValue.split('-');
		
		clickedOption.addClass('selected');
		
		console.log('The amount we clicked was ' + clickedOptionValue[1])
		
		updateAppTotal(clickedOptionValue);
		
		e.preventDefault();
		
	
	});
		
		
		
});