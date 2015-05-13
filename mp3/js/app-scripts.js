	
$(document).ready(function(){
	
	var cycleCount = 1;
	var currentCycle = 1;
		
	$('.value').on('click', function(e){
	
		var $this = $(this);
	
		// If handset is selected, pass an array to update the summary cmp and device
		
		if($this.attr('data-group') == "handset"){
		
			var handsetValue = ['handset', parseInt($this.attr('data-val'))];
			
			updateSummary(handsetValue);
			
			$this.addClass('selected');
		
		}
		
		e.preventDefault();
		
	});
	
	function updateSummary(value){
	
		// Get the current totals
		// Split the dollar value and setup the summary values
		var tempTotal = $('#cpm-total').text();
		tempTotal = tempTotal.split('$');
		tempTotal = tempTotal[1];
		var cmpTotal = parseInt(tempTotal);
		var deviceTotal = parseInt($('#device-total').text());
		
		
		// If we have navigated back a step (edit) we need to remove the value of the perviously selected device/plan
		if (currentCycle < cycleCount) {
		
			// remove value
		
		}
		
		// If we've selected a handset...
		if(value[0] == 'handset'){
		
			var selectedHandset = $('.planSelectButton.selected');
		
			if (selectedHandset.length !== 0){
			
				cmpTotal = cmpTotal - parseInt(selectedHandset.attr('data-val'));
				
				selectedHandset.removeClass('selected');
				
			} else {
			
				deviceTotal = deviceTotal + 1;
				
				$('#device-total').html(deviceTotal)
					.addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				
						$(this).html(deviceTotal).removeClass('animated flipInX');
			
				});
			
			//	 $('#device-total').html(deviceTotal).addClass('animated flipInX');
			
			}
		
			cmpTotal = cmpTotal + value[1];
			
			$('#cpm-total').html('$' + cmpTotal)
				.addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
										
					$(this).removeClass('flipInX');
		
			});
			
			// $('#cpm-total').html('$' + cmpTotal).addClass('animated flipInX');
			
		}
		
		// If we've selected a plan
		else if (value[0] == 'plan') {
		
			$('#device-total').html('$' + value[1]);
		
		}
	
			
	
	}
	
	
	
});