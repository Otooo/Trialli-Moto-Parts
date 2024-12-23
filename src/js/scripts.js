jQuery(function ($) {

    'use strict';

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    $(window).ready(function() {
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut('slow');
    });


    // -------------------------------------------------------------
    // Sticky Menu
    // -------------------------------------------------------------

    (function () {
        var nav = $('.navbar');
        var scrolled = false;

        $(window).scroll(function () {

            if (110 < $(window).scrollTop() && !scrolled) {
                nav.addClass('sticky animated fadeInDown').animate({ 'margin-top': '0px' });

                scrolled = true;
            }

            if (110 > $(window).scrollTop() && scrolled) {
                nav.removeClass('sticky animated fadeInDown').css('margin-top', '0px');

                scrolled = false;
            }
        });

    }());



    // -------------------------------------------------------------
    // WOW JS
    // -------------------------------------------------------------

    (function () {
        new WOW().init();
    }());


    // -----------------------------------------------------------------
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    // ------------------------------------------------------------------

    const getTargetOffset = ($anchor) => {
        var headerHeight = $(".navbar.navbar-default").outerHeight();
        var targetOffset = $($anchor.attr('href')).offset().top;

        var currentSection;
        $('section').each(function() {
            var sectionTop = $(this).offset().top - headerHeight;
            if ($(window).scrollTop() >= sectionTop) {
                currentSection = $(this).attr('id');
            }
        });
        if (currentSection == undefined || currentSection == "#home") {
            targetOffset -= headerHeight;
        }

        return targetOffset;
    }

    (function () {
	    $('a.page-scroll').bind('click', function(event) {
	        event.preventDefault();

            var $anchor = $(this)
            var targetOffset = getTargetOffset($anchor);

	        $('html, body').stop().animate({
	            scrollTop: targetOffset
	        }, 1500, 'easeInOutExpo');
	        
	    });
    }());


    $('.offcanvas-menu a.offcanvas-link').on('click', function(event){

        event.preventDefault();
        
        var $anchor = $(this);
        $anchor.closest('ul').find('>li').removeClass('active');        
        $anchor.parent().addClass('active');

        $('#off-canvas-close-btn').trigger('click');
        $('#off-canvas-close-btn').trigger('touchstart');

        var targetOffset = getTargetOffset($anchor);

        $(window).one('hippo-offcanvas-closed', function(e){
            e.stopImmediatePropagation();

            $('html, body').stop().animate({
                scrollTop: targetOffset - 30
            }, 900, 'easeInOutExpo');

        });

    });


    // -------------------------------------------------------------
    // OffCanvas
    // -------------------------------------------------------------

    (function () {
        $('button.navbar-toggle').HippoOffCanvasMenu({

        documentWrapper: '#st-container',
        contentWrapper : '.st-content',
        position       : 'hippo-offcanvas-left',    // class name
        // opener         : 'st-menu-open',            // class name
        effect         : 'slide-in-on-top',             // class name
        closeButton    : '#off-canvas-close-btn',
        menuWrapper    : '.offcanvas-menu',                 // class name below-pusher
        documentPusher : '.st-pusher'

        });
    }());


    //-------------------------------------------------------
    // counter
    //-------------------------------------------------------
    $('.counter-section').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });



    // -------------------------------------------------------------
    // Detect IE version
    // -------------------------------------------------------------
    (function () {
        function getIEVersion() {
            var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            return match ? parseInt(match[1]) : false;
        }


        if( getIEVersion() ){
            $('html').addClass('ie'+getIEVersion());
        }
       

        if( $('html').hasClass('ie9') || $('html').hasClass('ie10')  ){

            $('.submenu-wrapper').each(function(){

               $(this).addClass('no-pointer-events');

            });

        }

    }());




    // ------------------------------------------------------------------
    // jQuery for back to Top
    // ------------------------------------------------------------------

    (function(){

          $('body').append('<div class="no-caret" id="toTop"><i class="flaticon-thin16"></i></div>');

            $(window).scroll(function () {
                if ($(this).scrollTop() != 0) {
                    $('#toTop').fadeIn();
                } else {
                    $('#toTop').fadeOut();
                }
            }); 

        $('#toTop').on('click',function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

    }());



	// -----------------------------------------------------------------
	//STELLAR FOR BACKGROUND SCROLLING
	// ------------------------------------------------------------------

	$(window).load(function() {
	    $(window).stellar({
	        horizontalScrolling: false,
	        responsive: true
	    });

	});




	// -----------------------------------------------------------------
	//CONTACT FORM
	// ------------------------------------------------------------------

	(function () {

        $('#contactForm').on('submit',function(e){

            e.preventDefault();

            var $action = $(this).prop('action');
            var $data = $(this).serialize();
            var $this = $(this);

            $this.prevAll('.alert').remove();

            $.post( $action, $data, function( data ) {

                if( data.response=='error' ){

                    $this.before( '<div class="alert alert-danger">'+data.message+'</div>' );
                }

                if( data.response=='success' ){

                    $this.before( '<div class="alert alert-success">'+data.message+'</div>' );
                    $this.find('input, textarea').val('');
                }

            }, "json");

        });
    }());



	// -----------------------------------------------------------------
	//GOOGLE MAP
	// ------------------------------------------------------------------

	jQuery(document).ready(function($) {

	    "use strict";
	    //set your google maps parameters
	    var $latitude = -12.199180122096449,
	        $longitude = -38.95878091692797,
	        $map_zoom = 14; /* ZOOM SETTING */

	    //google map custom marker icon 
	    var $marker_url = 'img/map-marker.png';

	    //we define here the style of the map
	    var style = [{
	        "stylers": [{
	            "hue": "#deb235"
	        }, {
	            "saturation": 100
	        }, {
	            "gamma": 2.15
	        }, {
	            "lightness": 12
	        }]
	    }];

	    //set google map options
	    var map_options = {
	        center: new google.maps.LatLng($latitude, $longitude),
	        zoom: $map_zoom,
	        panControl: true,
	        zoomControl: true,
	        mapTypeControl: false,
	        streetViewControl: true,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        scrollwheel: false,
	        styles: style,
	    }
	    //inizialize the map
	    var map = new google.maps.Map(document.getElementById('googleMap'), map_options);
	    //add a custom marker to the map                
	    var marker = new google.maps.Marker({
	        position: new google.maps.LatLng($latitude, $longitude),
	        map: map,
	        visible: true,
	        icon: $marker_url,
	    });


	    $('#cssMapModal').on('shown.bs.modal', function(){

	     google.maps.event.trigger(map, 'resize');
	     map.setCenter(new google.maps.LatLng($latitude, $longitude));
	  });

	   
	});



}); // JQuery end