/*----------------------------------------
	Theme Name: Furniture
	Start Date : May 14 2016
	End Date : May 27 2016
	Last change: June 02 2016
	Version: 1.0
	Assigned to:
	Primary use:
-----------------------------------------*/
	/* [Layout] */
	
/*---------------------------------------
	
	- Google Map
	
	* Document Scroll		
		
	* Document Ready
		- Scrolling Navigation
		- Find all anchors
		- Quantity
		- Responsive Caret
		- Expand Panel
		- Photo Slider
		- Light Slider 
		- Product Carousel
		- Client Carousel
		- Client Carousel 1
		- Testimonials Section
		- Product thumbnails
		- Price Filter
		- CountDown
		- Contact Map
		- Quick Contact Form

	* Window Load
		- Site Loader
		
------------------------------------------*/

(function($) {

	"use strict"	
	
	/* - Google Map */
	function initialize(obj) {
		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = "images/marker.png";
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom") ,10);		
		var styles = [{"featureType":"landscape","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":" "},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":" "},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":" "},{"saturation":" "}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":" "},{"saturation":" "}]}]
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});	
		
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);	
		
		map.mapTypes.set("map_style", styledMap);
		map.setMapTypeId("map_style");
		
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(map,marker);
		});	
	}

	
	/* * Document Scroll - Window Scroll */
	$( document ).scroll(function()
	{
		var scroll	=	$(window).scrollTop();
		var height	=	$(window).height();

		/*** set sticky menu ***/
		if( scroll >= height )
		{
			$(".menu-block").addClass("navbar-fixed-top animated fadeInDown").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$(".menu-block").removeClass("navbar-fixed-top animated fadeInDown");
		}
		else
		{
			$(".menu-block").removeClass("navbar-fixed-top animated fadeInDown");
		} // set sticky menu - end		

		if ($(this).scrollTop() >= 50)
		{
			// If page is scrolled more than 50px
			$("#back-to-top").fadeIn(200);    /* Fade in the arrow */
		}
		else
		{
			$("#back-to-top").fadeOut(200);   /* Else fade out the arrow */
		}
	});
		
	/* * Document Ready - Handler for .ready() called */
	$(document).ready(function($) {
		
		/* - Scrolling Navigation */
		var scroll	=	$(window).scrollTop();
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/*** set sticky menu ***/
		if( scroll >= height -500 )
		{
			$(".menu-block").addClass("navbar-fixed-top").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$(".menu-block").removeClass("navbar-fixed-top");
		}
		else
		{
			$(".menu-block").removeClass("navbar-fixed-top");
		} /* set sticky menu - end */
		
		/* local url of page (minus any hash, but including any potential query string) */
		var url = location.href.replace(/#.*/,'');

		/* - Find all anchors */
		$("#navbar").find("a[href]").each(function(i,a) {

			var $a = $(a);
			var href = $a.attr("href");

			/* check is anchor href starts with page's URI */
			if ( href.indexOf(url+'#') == 0 ) {

				/* remove URI from href */
				href = href.replace(url,'');

				/* update anchors HREF with new one */
				$a.attr("href",href);
			}
		});

		/* - Quantity */

		/* This button will increment the value*/
		$(".qtyplus").on( "click", function(e){
			/* Stop acting like a button */
			e.preventDefault();

			/* Get the field name */
			var fieldName = $(this).attr('data-field');

			/* Get its current value */
			var currentVal = parseInt($('input[name='+fieldName+']').val());
			
			/* If is not undefined */
			if (!isNaN(currentVal)) {
				/* Increment */
				$('input[name='+fieldName+']').val(currentVal + 1);
			} else {
				/* Otherwise put a 0 there */
				$(this).find('input[name='+fieldName+']').val(0);
			}
		});

		/* This button will decrement the value till 0 */
		$(".qtyminus").on( "click" , function(e) {		
			e.preventDefault();		
			var fieldName = $(this).attr('data-field');		
			var currentVal = parseInt($('input[name='+fieldName+']').val());		
			if (!isNaN(currentVal) && currentVal > 0) {			
				$('input[name='+fieldName+']').val(currentVal - 1);
			} else {			
				$('input[name='+fieldName+']').val(0);
			}
		});
		
		/* - Responsive Caret */
		$(".ddl-switch").on("click", function() {

			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Expand Panel */
		$("#slideit").on ("click", function() {
			$("#slidepanel").slideDown(1000);
			$("html").animate({ scrollTop: 0 }, 1000);
		});	

		/* Collapse Panel */
		$("#closeit").on ("click", function() {
			$("#slidepanel").slideUp("slow");	
			$("html").animate({ scrollTop: 0 }, 1000);
		});	
		
		/* Switch buttons from "Log In | Register" to "Close Panel" on click */
		$("#toggle a").on ("click", function () {
			$("#toggle a").toggle();
		});
		
		
		
		/* - Photo Slider */

			//Function to animate slider captions 
			function doAnimations( elems ) {
				//Cache the animationend event in a variable
				var animEndEv = 'webkitAnimationEnd animationend';
				
				elems.each(function () {
					var $this = $(this),
						$animationType = $this.data('animation');
					$this.addClass($animationType).one(animEndEv, function () {
						$this.removeClass($animationType);
					});
				});
			}

			//Variables on page load 
			var $myCarousel = $('#main-carousel'),
				$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
				
			//Initialize carousel 
			$myCarousel.carousel();
			
			//Animate captions in first slide on page load 
			doAnimations($firstAnimatingElems);
			
			//Pause carousel  
			$myCarousel.carousel('pause');
			
			
			//Other slides to be animated on carousel slide event 
			$myCarousel.on('slide.bs.carousel', function (e) {
				var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
				doAnimations($animatingElems);
		});
		
		/* - Light Slider */
		$('#imageGallery').lightSlider({
			gallery:true,
			responsive : [],
			item:1,
			loop:true,
			controls: false,
			thumbItem:8,
			thumbMargin: 10,
			slideMargin:0,
			enableDrag: false,
			currentPagerPosition:'middle',
			onSliderLoad: function(el) {
			}   
		}); 
		
		/* - CountDown */		
		var ele_id = 0;
		$( "[id*='clock-']" ).each(function () { 
			ele_id = $(this).attr('id').split("-")[1];
			var cnt_date = $(this).attr("data-date");
			$("[id*='clock-"+ele_id+"']").countdown(cnt_date, function(event) {
				var $this = $(this).html(event.strftime(''    
				+ '<p>%D <span>Days</span></p>'
				+ '<p>%H <span>Hours</span></p>'
				+ '<p>%M <span>Mins</span></p>'
				+ '<p>%S <span>Secs</span></p>'));
		    });
		});	
		
		/* - Product Carousel */
		$('.product-carousel').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			centerPadding: '0px',
			responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					centerMode: true,
					slidesToShow: 1
				}
			}]
		}); 
		var filtered = false;

		$('.product-link').on('click', function(){
			var filtername = $(this).parent('li').attr('id');
			var currentclass = $(this).attr('class');
			$(".products-categories li").removeClass("active");
			$(this).parent('li').addClass("active");
			
			if (filtered === false) {
				$('.product-carousel').slick('slickUnfilter');
				$('.product-carousel').slick('slickFilter','.filter-' + filtername);
				//$('.product-button').attr('class', 'product-button');
				$(this).attr('class', 'product-link');
			} else {
				$('.product-carousel').slick('slickUnfilter');
				$('.product-carousel').slick('slickFilter', '.filter-' + filtername);
				$('.product-carousel').slickGoTo(0);
				//$('.product-button').attr('class', 'btn btn-xs btn-default product-button');
				$(this).attr('class', 'product-link');
				filtered = false;
			}
		});
		
		
		/* - Client Carousel */
		
		if( $(".clients-carousel").length ) {
			$(".clients-carousel").owlCarousel({
				loop: true,
				margin: 0,
				nav: false,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					500:{
						items: 2
					},
					600:{
						items: 3
					},
					1000:{
						items: 6
					}
				}
			});
		}
		
		/* - Client Carousel 1 */
		if( $(".clients-carousel-1").length ) {
			$(".clients-carousel-1").owlCarousel({
				loop: true,
				margin: 0,
				nav: true,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					500:{
						items: 2
					},
					600:{
						items: 3
					},
					1000:{
						items: 6
					}
				}
			});
		}
		
		/* - Testimonials Section */
		if($(".testimonials-box").length){
			$(".testimonials-box").owlCarousel({
				loop: true,				
				margin: 10,
				dots: true,
				nav:false,				
				autoplay:false,				
				autoplayHoverPause:true,
				responsive:{
					0:{
						items:1
					},
					640:{
						items:2
					},
					992:{
						items:3
					},
					1200:{
						items:3
					}
				}
			})
		}
		
		/* - Product thumbnails */
		$('.product').magnificPopup({
			delegate: 'a.zoom',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			}
		});
		
		
		/* - Price Filter */
		
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 15000,
			values: [ 0, 10000 ],
			slide: function( event, ui ) {
				$( "#amount" ).html( "$" + ui.values[ 0 ] )
				$( "#amount2" ).html( "$" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).html( "$" + $( "#slider-range" ).slider( "values", 0 ) );
		$( "#amount2" ).html( " $" + $(  "#slider-range" ).slider( "values", 1 ) );
		
		
		/* - CountDown */		
		var ele_id = 0;
		$( "[id*='clock-']" ).each(function () { 
			ele_id = $(this).attr('id').split("-")[1];
			var cnt_date = $(this).attr("data-date");
			$("[id*='clock-"+ele_id+"']").countdown(cnt_date, function(event) {
				var $this = $(this).html(event.strftime(''    
				+ '<p>%D <span>Days</span></p>'
				+ '<p>%H <span>Hours</span></p>'
				+ '<p>%M <span>Mins</span></p>'
				+ '<p>%S <span>Secs</span></p>'));
		    });
		});
		
		/* - Contact Map */
		if($("#map-canvas-contact").length==1){
			initialize("map-canvas-contact");
		}
		
		/* - Quick Contact Form */
		$( "#btn_submit" ).on( "click", function(event) {
		  event.preventDefault();
		  var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {
					if( data["type"] == "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");					
						$("#input_name").val("");						
						$("#input_email").val("");						
						$("#input_subject").val("");						
						$("#textarea_message").val("");
						$("#alert-msg").show();				
					}			
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
			
			return false;
		});
		
		/* - Animation Effect */		
		$(".products-categories").each(function() {
		
			var $this = $(this); 

			$this.appear(function() {
				$($this).addClass('animated bounceInDown');
			});
		});
		
		$(".saleup-info").each(function() {
		
			var $this = $(this); 

			$this.appear(function() {
				$($this).addClass('animated fadeInLeft');
			});
		});
		
		$(".saleup-img").each(function() {
		
			var $this = $(this); 

			$this.appear(function() {
				$($this).addClass('animated fadeInRight');
			});
		});
		
		$(".products").each(function() {
		
			var $this = $(this); 

			$this.appear(function() {
				$($this).addClass('animated lightSpeedIn');
			});
		});
		
		$(".latest-blog").each(function() {
		
			var $this = $(this); 

			$this.appear(function() {
				$($this).addClass('animated zoomInLeft');
			});
		});
		
		$(".secure-content").each(function() {
		
			var $this = $(this); 

			$this.appear(function() {
				$($this).addClass('animated fadeInLeft');
			});
		});	
		
	});	/* - Document Ready /- */
	
	/* * Window Load - Handler for .load() called */
	$(window).load(function() {
		
		/* - Site Loader */
		
		if ( !$("html").is(".ie6, .ie7, .ie8") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
	});

})(jQuery);




