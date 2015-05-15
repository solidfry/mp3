	
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
	
	function showFullSummary(){
		
		windowPosition = $(document).scrollTop();
		
		$('.summary').animate({ top : 0 }, 300, function(){
			
			$(this).css('position', 'absolute');
			$('.view').hide();
			$(document).scrollTop($('html').scrollTop())
			
		});

		$('.summary__title--link').toggleClass('full');
		
	}
	
	function hideFullSummary(){

		$('.summary').css('position', 'fixed');
		$('.view.visible').show();
		$(window).scrollTop(windowPosition);
		
		// Get combined summary top bar height
		var summaryHeight =  $('.summary__title').outerHeight() + $('.summary__info').outerHeight();

		// Animate the window height - the summary top bar height
		summary.animate({ top : ($(window).height() - summaryHeight) }, 300, function(){


		});

		
		$('.summary__title--link').toggleClass('full');
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

	// Cycle between views

	var views = $('.view');
	$(views[0]).fadeIn().addClass('visible');

	//

	$('[data-step]').on('click', function(){

		var nextStep = $(this).attr('data-step');

		$('.view.visible').fadeOut('fast', function(){

			$('.view.visible').removeClass('visible');

				$('.view.' + nextStep).fadeIn('fast', function(){

					$('.view.' + nextStep).addClass('visible')

			});

		});



	});

		
	$('.value').on('click', function(e){
	
		var $this = $(this);
	
		// If handset is selected, pass an array to update the summary cmp and device
		
		if(!$this.hasClass('selected') && $this.attr('data-group') == "handset"){
		
			var handsetValue = ['handset', parseInt($this.attr('data-val'))];
			
			updateSummary(handsetValue);
			
			$this.addClass('selected');
		
		}
		
		
		$('.view.visible').fadeOut('fast', function(){
		
		console.log('We\'re moving on');
				
			// Temporary solution to get next view
			
			var nextView = $('.view.visible').next('.view');
			
			nextView.fadeIn('fast', function(){

				$('.view.visible').removeClass('visible').next('.view').addClass('visible');

			});
			
		});
			
		// If handset is selected, pass an array to update the summary cmp and device
		
		if(!$this.hasClass('selected') && $this.attr('data-group') == "handset"){
		
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
		
			$('#device-total').html('$' + value[1]);
		
		}
	
			
	
	}
	
	
	
});
