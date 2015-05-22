$(document).ready(function(){


    $('.home .model__item').each(function() {
        $(this).prepend("<span class='model__count'>" + ($(this).index() +1) + "</span>");
    });
	
    // Model Config reveal

     $('.model__item .tap').click(function(e) {
	 
		$this = $(this);

		if ($this.parent().find(".model__config-panel").hasClass('on')){
		
			 $this.parent().find(".model__config-panel").slideToggle().removeClass('on');
			 $this.parent().find('.model__config span').toggleClass('ico-arrow-up');
		
		} else {
	 
			$(".model__config-panel.on").slideToggle(300).removeClass('on');

			$this
				.parent()
				.find(".model__config-panel")
				.stop(true,true)
				.slideToggle(300, function(){

					$('body, html').velocity({

						scrollTop: $this.parent().offset().top -15

					}, 500, 'easeOutQuint');
				
				})
				.addClass('on');
			
		
			$this.parent().find('.model__config span').toggleClass('ico-arrow-up');
		
		}

     });
	 
	 

	 
    $('.capacityButton').click(function(e) {
	
        $('.capacityButton.active').removeClass('active');
        $(this).toggleClass('active');
		
		e.preventDefault();


    });
	
	

	// Position Summary Panel
	
	var windowPosition;
	var summary = $('.summary');
	
	function showSummary(element){
	
		// Display the summary below the window
		summary.css({ 'display' : 'block', 'position' : 'fixed', 'bottom' : '-300px' });

		// Once displayed off screen, get combined summary top bar height
		var summaryHeight =  $('.summary__title').outerHeight() + $('.summary__info').outerHeight();

		// Animate the window height - the summary top bar height
		summary.velocity({ bottom : '0px' }, 500, 'easeOutQuint', function(){
		
		
			if (element.attr('data-group') === "handset"){
			
				console.log('Summary shown, updating device...');
				
				var handsetValue = ['handset'];
				
				updateSummary(handsetValue);
				
			} else if (element.attr('data-group') === "sim") {
			
				var simValue = ['sim'];
				
				updateSummary(simValue);
			
			}
		
		});

	}
	
	
	
	// Setup cycle iterations
	
	var cycleCount = 0;
	var currentCycle = 0;
	var currentStep = 0;
	var cycleSteps = ['home'];
	
	console.log('The current view is ' + cycleSteps[0]);

	// Cycle between views

	var views = $('.view');
	$(views[0]).addClass('visible');

	//
	
	$('[data-step]').on('click', function(e){
	
		if(e.target != this) {
		
			switchView($(this).closest('[data-step]'));

		} else {
		
			switchView($(e.target));
			
		}
	
		e.preventDefault();
	
	});
	

	function switchView(element){
	
		$this = element;
	
		var nextStep = $this.attr('data-step');
	
		if (cycleCount == 0 && nextStep == 'plans'){
		
			showSummary($this);	
		
		}
		
		
		if (currentCycle == 0 && currentStep == 0) {
				
			$('.view.home').removeClass('animated fadeInUp');
		
		}
		
		var currentViewWidth = $('.view.' + cycleSteps[currentStep]).outerWidth();
		
		$('.view.' + cycleSteps[currentStep]).css({position : 'absolute', width : currentViewWidth}).velocity({
			
			left: '-100%',
            opacity:0
			
		}, 500, 'easeInOutExpo', function(){
		
			$(this).removeClass('visible').css({position : 'relative', width : 'inherit', left : '0'});
			
		});
		
		$('.view.' + nextStep).css({position : 'absolute', width : currentViewWidth, left : $(window).outerWidth()});
			
			$('.view.' + nextStep).addClass('visible').velocity({
		
			left: 0,
            opacity:100
		
		}, 500, 'easeInOutExpo', function(){
		
		});
		
		currentStep += 1;
		
		
		if (cycleSteps[cycleSteps.length-1] == 'plans'){
		
			$('.back-button').removeClass('animated fadeInHalfLeft').velocity({ left: '-50px' }, 500, 'easeInOutExpo');
			
			$('.model__config-panel').hide();
			
			currentCycle += 1;
			cycleCount += 1;
			
			$('.view.home .checkout').show();
			
			$('.view.home .step__title').text('Add more stuff!');
			
			$('.view.home .model__item').each(function(i, el){
			
				if (i < currentCycle) {
					
					
					$(el).css('display', 'block');				
				
				}
			
			});
		
			
			
		} else {
		
			$('.back-button').show().velocity({ left: '0.25em' }, 500, 'easeInOutExpo');
		
		}
		
		
	
		// Keep track of where we are by adding data-step to the global
		
		cycleSteps[currentStep] = $this.attr('data-step');
		
		console.log('The current view is ' + '[' + currentStep + '] ' + cycleSteps[currentStep]);
		console.log('The previous view is ' + cycleSteps[currentStep - 1]);
		
		// console.log('The cycleCount is ' + cycleCount);
		
		
	}
	
	// When Back button is clicked, cycle back to the previous view
	
	$('.back-button').on('click', function(){
		$('.home').removeClass('animated');
		var prevStep = $('.view.' + cycleSteps[(currentStep - 1)]);
		var currentViewWidth = $('.view.' + cycleSteps[currentStep]).outerWidth();
		
		$('.view.' + cycleSteps[currentStep]).css({position : 'absolute', width : currentViewWidth}).velocity({
			
			left: '100%',
            opacity:0
			
		}, 500, 'easeInOutExpo', function(){
		
			console.log('Animating ' + cycleSteps[currentStep])
		
			$('.view.' + cycleSteps[currentStep]).css({position : 'relative', width : 'inherit', left : '0'}).removeClass('visible');
			
			currentStep -= 1;
			cycleSteps.splice(-1,1);
			
		});
		
		$(prevStep).css({position : 'absolute', width : currentViewWidth, left : '-' + $(window).outerWidth() + 'px'});
			
		$(prevStep).addClass('visible').velocity({
	
			left: 0,
            opacity:100
		
		}, 500, 'easeInOutExpo');
		
		console.log('The current view is ' + cycleSteps[currentStep]);
		console.log('The previous view is ' + cycleSteps[(currentStep - 1)]);
		console.log('We have removed ' + cycleSteps[cycleSteps.length-1]);

		
		if (currentStep == '1'){
		
			$(this).removeClass('animated fadeInHalfLeft').velocity({ left: '-50px' }, 500, 'easeInOutExpo');
		
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
		
			var planValue = ['plan', $this.attr('data-val')];
			
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
		if(value[0] == 'handset' || value[0] == 'sim'){
		
			console.log('we selected a ' + value[0]);
		
		//	var selectedHandset = $('.phoneSelectButton.selected');
		//
		//	if (selectedHandset.length !== 0){
		//	
		//		cmpTotal = cmpTotal - parseInt(selectedHandset.attr('data-val'));
		//		
		//		selectedHandset.removeClass('selected');
		//		
		//	} else {
		
			
				deviceTotal = cycleCount+1;
				
				$('#device-total').html(deviceTotal)
					.addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				
						$(this).html(deviceTotal).removeClass('animated flipInX');
			
				});
			
		//	}
		
		//	cmpTotal = cmpTotal + value[1];
		//	
		//	$('#cpm-total').html('$' + cmpTotal)
		//		.addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		//								
		//			$(this).removeClass('flipInX');
		//
		//	});
			
			
		}
		
		// If we've selected a plan
		else if (value[0] == 'plan') {
		
			var planValue = value[1].split('-');
			
			$('#gb-total').html(planValue[0])
				.addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			
					$(this).removeClass('animated flipInX');
		
			});
			
			$('#cpm-total').html('$' + planValue[1])
				.addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			
					$(this).removeClass('animated flipInX');
		
			});
			
		
		}
	
			
	
	}
	
	
});
