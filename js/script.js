 $(window).on("scroll",function () {

	var bodyScroll = $(window).scrollTop(),
	navbar = $(".navbar");
	
	if(bodyScroll > 50){
	$('.navbar-logo img').attr('src','images/ifa.png');
	navbar.addClass("nav-scroll");

}else{
	$('.navbar-logo img').attr('src','images/ifa1.png');
	navbar.removeClass("nav-scroll");
}

});
$(window).on("load",function (){
	var bodyScroll = $(window).scrollTop(),
	navbar = $(".navbar");
	
	if(bodyScroll > 50){
	$('.navbar-logo img').attr('src','images/ifa.png');
	navbar.addClass("nav-scroll");
	}else{
	$('.navbar-logo img').attr('src','images/ifa1.png');
	navbar.removeClass("nav-scroll");
	}

	$.scrollIt({
	
	easing: 'swing',      // the easing function for animation
	scrollTime: 900,       // how long (in ms) the animation takes
	activeClass: 'active', // class given to the active nav element
	onPageChange: null,    // function(pageIndex) that is called when page is changed
	topOffset: -63
	});
});

// $(document).ready(function(){
//     $('.nav-item.dropdown').hover(function(){
//         $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
//     }, function(){
//         $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
//     });
// });
$(document).ready(function(){
    $('.nav-item.dropdown').hover(function(){
        $(this).find('.dropdown-menu').stop(true, true).fadeIn(500);
    }, function(){
        $(this).find('.dropdown-menu').stop(true, true).fadeOut(500);
    });
});

$(document).ready(function(){
    $('.nav-link.dropdown-toggle').hover(function(){
        $(this).find('.rotate-icon').addClass('hovered');
    }, function(){
        $(this).find('.rotate-icon').removeClass('hovered');
    });
});








