$(document).ready(function(){

	// Position Summary Panel
	
	var windowPosition;
	var summary = $('.summary');
	
	function showSummary(){
		
		// Display the summary below the window
		summary.css({ 'display' : 'block', 'position' : 'fixed', 'top' : $(window).height() + 20 });

		// Once displayed off screen, get combined summary top bar height
		var summaryHeight =  $('.summary__title').outerHeight() + $('.summary__info').outerHeight();

		// Animate the window height - the summary top bar height
		summary.animate({ top : ($(window).height() - summaryHeight) });

	}
	
	$('.summary__title--link').on('click', function(e){
		
		if ($(this).hasClass('full')){
		
			hideFullSummary();
		
		} else {
		
			showFullSummary();
		}
		
		e.preventDefault();
		
	});
	
	// Setup cycle iterations
	
	var cycleCount = 0;
	var currentCycle = 0;
	var currentStep = 0;
	var cycleSteps = ['step-1'];
	
	console.log('The current view is ' + cycleSteps[0]);

	// Cycle between views

	var views = $('.view');
	$(views[0]).addClass('visible');

	//

	$('.product-select').on('click', function(){
	
		var nextStep = $(this).find('button').attr('data-step');

		var currentViewWidth = $('.view.' + cycleSteps[currentStep]).outerWidth();
		
		$('.view.' + cycleSteps[currentStep]).css({position : 'absolute', width : currentViewWidth}).animate({
			
			left: '-800px'
			
		}, 500, 'easeInOutExpo', function(){
		
			$(this).removeClass('visible').css({position : 'static', width : 'inherit', left : '0'});
			
		});
		
		$('.view.' + nextStep).css({position : 'absolute', width : currentViewWidth, left : $(window).outerWidth()});
			
			$('.view.' + nextStep).addClass('visible').animate({
		
			left: 0
		
		}, 500, 'easeInOutExpo');
		
		currentStep += 1;
		
		if (currentStep == '1'){
		
			$('.back-button a').show();
		}
	
		// Keep track of where we are by adding data-step to the global
		
		cycleSteps[currentStep] = $(this).find('button').attr('data-step');
		
		console.log('The current view is ' + cycleSteps[currentStep]);
		console.log('The previous view is ' + cycleSteps[(currentStep - 1)]);
		
	});
	
	// When Back button is clicked, cycle back to the previous view
	
	$('.back-button a').on('click', function(){
		
		var prevStep = $('.view.' + cycleSteps[(currentStep - 1)]);
		var currentViewWidth = $('.view.' + cycleSteps[currentStep]).outerWidth();
		
		$('.view.' + cycleSteps[currentStep]).css({position : 'absolute', width : currentViewWidth}).animate({
			
			left: '800px'
			
		}, 500, 'easeInOutExpo', function(){
		
			console.log('Animating ' + cycleSteps[currentStep])
		
			$('.view.' + cycleSteps[currentStep]).css({position : 'static', width : 'inherit', left : '0'}).removeClass('visible');
			
			currentStep -= 1;
			cycleSteps.splice(-1,1);
			
		});
		
		
		$(prevStep).css({position : 'absolute', width : currentViewWidth, left : '-' + $(window).outerWidth() + 'px'});
			
		$(prevStep).addClass('visible').animate({
	
			left: 0
		
		}, 500, 'easeInOutExpo');
		
		
		console.log('The current view is ' + cycleSteps[currentStep]);
		console.log('The previous view is ' + cycleSteps[(currentStep - 1)]);
		
		console.log('We have removed ' + cycleSteps[cycleSteps.length-1]);

		
		if (currentStep == '1'){
		
			$(this).hide();
		
		}
		
		
		
	});

		
	$('.value').on('click', function(e){
	
		var $this = $(this);
	
		// If handset is selected, pass an array to update the summary cmp and device
		
		if(!$this.hasClass('selected') && $this.attr('data-group') == "handset"){
		
			var handsetValue = ['handset', parseInt($this.attr('data-val'))];
			
			updateSummary(handsetValue);
			
			$this.addClass('selected');
		
		}
		
		// If handset is selected, pass an array to update the summary cmp and device
		
		if (!$this.hasClass('selected') && $this.attr('data-group') == "handset") {
		
			var handsetValue = ['handset', parseInt($this.attr('data-val'))];
			
			updateSummary(handsetValue);
			
			$this.addClass('selected');
			
		} else if (!$this.hasClass('selected') && $this.attr('data-group') == "plan") {
		
			var planValue = ['plan', parseInt($this.attr('data-val'))];
			
			updateSummary(planValue);
			
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
		
		
		// If we have navigated back a step (edit) we need to remove the value of the previously selected device/plan
		if (currentCycle < cycleCount) {
		
			// remove value
		
		}
		
		// If we've selected a handset...
		if(value[0] == 'handset'){
		
			var selectedHandset = $('.phoneSelectButton.selected');
		
			if (selectedHandset.length !== 0){
			
				cmpTotal = cmpTotal - parseInt(selectedHandset.attr('data-val'));
				
				selectedHandset.removeClass('selected');
				
			} else {
			
				showSummary();
			
				deviceTotal = deviceTotal + 1;
				
				$('#device-total').html(deviceTotal)
					.addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				
						$(this).html(deviceTotal).removeClass('animated flipInX');
			
				});
			
			
			}
		
			cmpTotal = cmpTotal + value[1];
			
			$('#cpm-total').html('$' + cmpTotal)
				.addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
										
					$(this).removeClass('flipInX');
		
			});
			
			
		}
		
		// If we've selected a plan
		else if (value[0] == 'plan') {
		
			$('#gb-total').html('$' + value[1]);
			
		
		}
	
			
	
	}
	
	
	
});
