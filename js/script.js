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
    // Biến đánh dấu trạng thái của menu
    var isMenuOpen = false;

    // Xử lý sự kiện khi click hoặc touch vào mục menu
    $('.nav-item.dropdown').on('click touchstart', function(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện lan ra bên ngoài
        var dropdownMenu = $(this).find('.dropdown-menu');

        if (!isMenuOpen) { // Nếu menu chưa mở
            dropdownMenu.stop(true, true).fadeIn(500); // Hiển thị menu
            isMenuOpen = true; // Cập nhật trạng thái là menu đã mở
        } else { // Nếu menu đã mở
            dropdownMenu.stop(true, true).fadeOut(500); // Ẩn menu
            isMenuOpen = false; // Cập nhật trạng thái là menu đã thu vào
        }
    });

    // Xử lý sự kiện khi click hoặc touch ra ngoài mục menu
    $(document).on('click touchstart', function(e) {
        if (!$(e.target).closest('.nav-item.dropdown').length) { // Nếu click ra khỏi mục menu
            if (isMenuOpen) { // Nếu menu đang mở
                $('.dropdown-menu').stop(true, true).fadeOut(500); // Ẩn menu
                isMenuOpen = false; // Cập nhật trạng thái là menu đã thu vào
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








