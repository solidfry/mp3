$(document).ready(function () {

    // Update device information in the home panel. This adds a validation notification.
	
    var updateDevice = $('.update');
	
    var updateAnim = '<div class="updated"><span class="checkmarkWrap"><span class="checkmark"><div class="checkmark_circle ico ico-tick"></div></span></span></div>';
	
    updateDevice.click(function () {
        $this.parent().find(".model__config-panel").prepend(updateAnim).delay(3000).slideUp();

        setTimeout(function () {
            $('.updated').remove();
        }, 3000);
        $('.expanded').removeClass('expanded');
        $('.on').removeClass('on');
    });
	


    // Generic show/hide toggle function (e.g. Model Config)

    $('.tap').click(function (e) {

        $this = $(this);

        if ($this.parent().find(".model__config-panel, .planBody ").hasClass('on')) {

            $this.parent().find(".model__config-panel, .planBody ").slideToggle().removeClass('on');
            $this.parent().find('.model__config span').toggleClass('ico-arrow-up');
            $this.parent().removeClass('expanded');
        } else {

            $(".model__config-panel.on, .planBody.on ").slideToggle(300).removeClass('on');
            $(".planSummaryItem").removeClass('expanded');
            $this
                .parent()
                .find(".model__config-panel, .planBody ")
                .stop(true, true)
                .slideToggle(300, function () {

                    $('body, html').animate({

                        scrollTop: $this.parent().offset().top - 15

                    }, 500, 'easeOutQuint');

                })
                .addClass('on');
                $this.parent().addClass('expanded');

            $this.parent().find('.model__config span').toggleClass('ico-arrow-up');

        }

    });
	
	
	// Switch active capacity when selection changes

    $('.capacityButton').click(function (e) {

        $('.capacityButton.active').removeClass('active');
        $(this).toggleClass('active');

        e.preventDefault();


    });


    // Position Summary Panel

    var summary = $('.summary');
	
	// Show summary function is run when device is selected

    function showSummary(element) {

        // Display the summary below the window
		
        summary.css({
            'display': 'block',
            'position': 'fixed',
            'bottom': '-300px',
            'right': '0px'
        });

        // Once displayed off screen, get combined summary top bar height
		
        var summaryHeight = summary.outerHeight();

        // Animate the window height - the summary top bar height
		
        summary.animate({
            bottom: '0px'
        }, 500, 'easeOutQuint', function () {

            if (element.attr('data-group') === "handset") {

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

    // Set the first .view div as .visible on page load

    var views = $('.view');
    $(views[0]).addClass('visible');

    // When an element with a data-step attribute is clicked, 

    $('[data-step]').on('click', function (e) {
	
		// To manage clickable child elements (should perhaps be managed with stopPropagation())

        if (e.target != this) {
		
            switchView($(this).closest('[data-step]'));

        } else {
		
            switchView($(e.target));

        }

        e.preventDefault();

    });
	

	// Function from David Walsh: http://davidwalsh.name/css-animation-callback
	// To detect the end of a CSS animation
	
	function whichTransitionEvent(){
	  var t,
		  el = document.createElement("fakeelement");

	  var transitions = {
		"animation"      : "animationend",
		"OAnimation"     : "oAnimationEnd",
		"MozAnimation"   : "animationend",
		"WebkitAnimation": "webkitAnimationEnd"
	  }

	  for (t in transitions){
		if (el.style[t] !== undefined){
		  return transitions[t];
		}
	  }
	}
	
	var transitionEvent = whichTransitionEvent();
		
		
	// The brain. This function determines the next/previous views and positions and shows them accordingly.
	
	function switchView(element) {
		
		// Get the element that was passed from the click function
		
        $this = element;
		
		// Determine the next view that needs to be shown

        var nextStep = $this.attr('data-step');
		
		// If we're in the first cycle we need to show the summary when a device is selected

        if (cycleCount == 0 && nextStep == 'plans') {

            showSummary($this);

        } else if (cycleCount > 0 && nextStep == 'plans') {
		
		
			if ($this.attr('data-group') === "handset") {

                var handsetValue = ['handset'];

                updateSummary(handsetValue);

            } else if ($this.attr('data-group') === "sim") {

                var simValue = ['sim'];

                updateSummary(simValue);

            }
			
		
		}
		
		// Remove animation classes from home view (we only want them to run on page load)

        if (currentCycle == 0 && currentStep == 0) {

            $('.view.home').removeClass('animated fadeInUp');

        }
		
		// CSS Animations
		
		$this.closest('.view').addClass('zipOutLeft');
		
		$('.' + nextStep).addClass('visible zipInRight');
		
		$('.zipOutLeft').one(transitionEvent,
			function(event) {
			
			// After animation ends, remove the classes
			
			$('.zipOutLeft').removeClass('visible zipOutLeft');
		});
        $("html, body").animate({
            scrollTop: 0
        }, "fast");
		$('.zipInRight').one(transitionEvent,   
		function(event) {
		
			// After animation ends, remove the classes

			$('.zipInRight').removeClass('zipInRight');
		
		});
				
				
				
		
        currentStep += 1;


        if (cycleSteps[cycleSteps.length - 1] == 'plans') {

            $('.back-button').removeClass('animated fadeInHalfLeft').animate({
                left: '-50px'
            }, 500, 'easeInOutExpo');

            $('.model__config-panel, .planBody ').removeClass('on').hide();
            $('.planSummaryItem.expanded').removeClass('expanded');
            currentCycle += 1;
            cycleCount += 1;

            $('.view.home .checkout').show();

            $('.view.home .step__title').html('<span class="ico ico-home yellow"></span> Add more stuff!');

            $('.view.home .model__item').each(function (i, el) {

                if (i < currentCycle) {


                    $(el).css('display', 'block');

                }

            });



        } else {

            $('.back-button').show().animate({
                left: '0.25em'
            }, 500, 'easeInOutExpo');

        }

        // Keep track of where we are by adding data-step to the global

        cycleSteps[currentStep] = $this.attr('data-step');

    }

    // When Back button is clicked, cycle back to the previous view

    $('.back-button').on('click', function () {
	
		// Grab the preview view from the Array
	
        var prevStep = $('.view.' + cycleSteps[(currentStep - 1)]);
		
		// Tell the visible view to animate out
		
		$('.visible').addClass('zipOutRight');
		
		// Tell the previous step to animate in
				
		prevStep.addClass('visible zipInLeft');
		
		// Once animations are done, remove the classes
		
		$('.zipOutRight').one('webkitAnimationEnd',   
		function(e) {
		
			$('.zipOutRight').removeClass('visible zipOutRight');
		
		});
		
		$('.zipInLeft').one('webkitAnimationEnd',
		function(e) {
		
			$('.zipInLeft').removeClass('zipInLeft');
		
		});
		
		// If we get back to the first view, hide the back button
		
        if (currentStep == '1') {

            $(this).removeClass('animated fadeInHalfLeft').animate({
                left: '-50px'
            }, 500, 'easeInOutExpo');

        }
		
		// As we've navigated back, remove an increment from currentStep and remove the last item from cycleSteps
		
		currentStep -= 1;
		cycleSteps.splice(-1,1);

    });


    $('.value').on('click', function (e) {

        var $this = $(this);

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

    function updateSummary(value) {

        // Get the current totals
        // Split the dollar value and setup the summary values

        var tempTotal = $('#cpm-total').text();
        tempTotal = tempTotal.split('$');
        tempTotal = tempTotal[1];
        var cpmTotal = parseInt(tempTotal);
        var deviceTotal = parseInt($('#device-total').text());


        // If we have navigated back a step (edit) we need to remove the value of the previously selected device/plan
		
        if (currentCycle < cycleCount) {

            // remove value

        }

        // If we've selected a handset...
		
        if (value[0] == 'handset' || value[0] == 'sim') {

            //	var selectedHandset = $('.phoneSelectButton.selected');
            //
            //	if (selectedHandset.length !== 0){
            //
            //		cmpTotal = cmpTotal - parseInt(selectedHandset.attr('data-val'));
            //
            //		selectedHandset.removeClass('selected');
            //
            //	} else {
			
			console.log('Updating handset in summary');


            deviceTotal = cycleCount + 1;

            $('#device-total').html(deviceTotal)
                .addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {

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
                .addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {

                    $(this).removeClass('animated flipInX');

                });
				
			cpmTotal += parseInt(planValue[1]);

            $('#cpm-total').html('$' + cpmTotal).addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {

                $(this).removeClass('animated flipInX');

            });


        }



    }


});
