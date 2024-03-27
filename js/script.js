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
    var isMenuOpen = false; // Biến đánh dấu trạng thái mở hay đóng của menu

    // Sự kiện khi click hoặc touch vào mục menu
    $('.nav-item.dropdown').on('click touchstart', function(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click hoặc touch tự lan ra ngoài để không tắt menu ngay lập tức
        if (!isMenuOpen) { // Nếu menu đang đóng
            $(this).find('.dropdown-menu').stop(true, true).fadeIn(0); // Mở menu
            isMenuOpen = true; // Cập nhật trạng thái là đã mở
        } else { // Nếu menu đang mở
            $(this).find('.dropdown-menu').stop(true, true).fadeOut(0); // Đóng menu
            isMenuOpen = false; // Cập nhật trạng thái là đã đóng
        }
    });

    // Sự kiện khi click hoặc touch ra khỏi mục menu
    $(document).on('click touchstart', function(e) {
        if (!$(e.target).closest('.nav-item.dropdown').length) { // Nếu click ra khỏi mục menu
            if (isMenuOpen) { // Nếu menu đang mở
                $('.dropdown-menu').stop(true, true).fadeOut(0); // Đóng menu
                isMenuOpen = false; // Cập nhật trạng thái là đã đóng
            }
        }
    });
});





$(document).ready(function(){
    $('.nav-link.dropdown-toggle').hover(function(){
        $(this).find('.rotate-icon').addClass('hovered');
    }, function(){
        $(this).find('.rotate-icon').removeClass('hovered');
    });
});








