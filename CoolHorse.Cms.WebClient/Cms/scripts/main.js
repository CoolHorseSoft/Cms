/*
	Project Name : Wikideo
	
	
*/

(function($) {
	
	"use strict";

	/* - Google Map */
	function initialize(obj) {
		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = "img/map-marker.png";
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom") ,10);		
		var styles = [{"featureType": "administrative.country","elementType": "geometry","stylers": [{"visibility": "simplified"},{"hue": "#ff0000"}]}]
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
	
	/* ## Document Ready - Handler for ready() called */
	$(document).on( "ready" ,function(){
		
		if( $(".main-slider").length ) {
			$(".main-slider").owlCarousel({
				autoPlay: false,/* 3000, */
				singleItem: true,
				pagination: false,
				navigation: true,
				navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
			});
		}
		
		if( $(".tp-slider").length ) {
			$( ".tp-slider" ).owlCarousel({
				items: 4,
				autoPlay: 3000,
				itemsCustom: [
					[0, 1], 
					[480, 2], 
					[700, 3], 
					[992, 3], 
					[1200, 4], 
					[1600, 4]
				]
			});
		}
		
		if( $(".clients-slider").length ) {
			$( ".clients-slider" ).owlCarousel({
				items: 2,
				autoPlay: 3000,
				itemsCustom: [
					[0, 1], 
					[400, 1], 
					[700, 2], 
					[1000, 2], 
					[1200, 2], 
					[1600, 2]
				]
			});
		}
		
		if( $(".partners-carousel").length ) {		
			$( ".partners-carousel" ).owlCarousel({
				items: 5,
				autoPlay: 3000,
				pagination: false,
				itemsCustom: [
					[0, 1], 
					[400, 2], 
					[700, 3], 
					[1000, 4], 
					[1200, 4], 
					[1600, 5]
				]
			});
		}
		
		$( "#nm-clock" ).countdown('2017/01/10', function(event) {
		   var $this = $(this).html(event.strftime(''
			 + '<div class="time-p mt-70 text-center"> <span class="work-sans text-semi-bold fz-36 ls-2 white">%d</span> <span class="days work-sans fz-14 text-semi-bold white text-uppercase">days</span> </div> '
			 + '<div class="time-p mt-70 text-center"><span class="work-sans text-semi-bold fz-36 ls-2 white">%H</span>  <span class="hr work-sans fz-14 text-semi-bold white text-uppercase">hours</span>  </div>'
			 + '<div class="time-p mt-70 text-center"><span class="work-sans text-semi-bold fz-36 ls-2 white">%M</span>  <span class="min work-sans fz-14 text-semi-bold white text-uppercase">mins</span>  </div>'
			 + '<div class="time-p mt-70 text-center"><span class="work-sans text-semi-bold fz-36 ls-2 white">%S</span>  <span class="sec work-sans fz-14 text-semi-bold white text-uppercase">secs</span> </div>'));
		});

		$( ".grid" ).imagesLoaded( function() {
			$( ".grid" ).isotope({
				/* options */
				itemSelector: ".grid-item",
				masonry: {
					columnWidth: 1
				}
			});
		});
		
		if( $("#slider-range").length ) {
			$( "#slider-range" ).slider({
				range: true,
				min: 0,
				max: 999,
				values: [ 100, 560 ],
				slide: function( event, ui ) {
					$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
				}
			});
			$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
		}
		
		if( $(".s-products-slider").length ) {
			$( ".s-products-slider" ).owlCarousel({
				//options
				autoPlay: false,//3000,
				singleItem: true,
				pagination: false,
				navigation: true,
				navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
			});
		}
		
		if( $(".pi-tp-slider").length ) {
			$( ".pi-tp-slider" ).owlCarousel({
				items: 3,
				autoPlay: 3000,
				itemsCustom: [
					[0, 1], 
					[400, 1], 
					[768, 2], 
					[1000, 3],
					[1200, 3], 
					[1600, 3]
				]
			});
		}
		
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
						$("#input_phone").val("");
						$("#input_subject").val("");
						$("#input_message").val("");
						$("#alert-msg").show();
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					//alert(textStatus);
				}
			});
			return false;
		});/* Quick Contact Form /- */

	});

})(jQuery);