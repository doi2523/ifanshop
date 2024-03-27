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

$(document).ready(function(){
    $('.nav-item.dropdown').hover(function(){
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function(){
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });
});
$(document).ready(function(){
    var isMenuOpen = false; // Biến đánh dấu trạng thái mở hay đóng của menu

    // Sự kiện khi click vào mục menu
    $('.nav-item.dropdown').click(function(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click tự lan ra ngoài để không tắt menu ngay lập tức
        if (!isMenuOpen) { // Nếu menu đang đóng
            $(this).find('.dropdown-menu').stop(true, true).fadeIn(500); // Mở menu
            isMenuOpen = true; // Cập nhật trạng thái là đã mở
        } else { // Nếu menu đang mở
            $(this).find('.dropdown-menu').stop(true, true).fadeOut(500); // Đóng menu
            isMenuOpen = false; // Cập nhật trạng thái là đã đóng
        }
    });

    // Sự kiện khi click ra khỏi mục menu
    $(document).click(function(e) {
        if (!$(e.target).closest('.nav-item.dropdown').length) { // Nếu click ra khỏi mục menu
            if (isMenuOpen) { // Nếu menu đang mở
                $('.dropdown-menu').stop(true, true).fadeOut(500); // Đóng menu
                isMenuOpen = false; // Cập nhật trạng thái là đã đóng
            }
        }
    });
});

document.querySelector('.img__btn').addEventListener('click', function() {
	document.querySelector('.cont').classList.toggle('s--signup');
  });


  document.getElementById('dangky').addEventListener('click', function() {
	document.querySelector('.form.sign-up').classList.toggle('slide-in');
  });
  
  


  
//   document.getElementById("dangky").addEventListener("click", function() {
// 	document.querySelector(".form.sign-in").style.display = "none";
// 	document.querySelector(".form.sign-up").style.display = "block";
//   });
  
//   document.getElementById("dangnhap").addEventListener("click", function() {
// 	document.querySelector(".form.sign-up").style.display = "none";
// 	document.querySelector(".form.sign-in").style.display = "block";
//   });
  
document.getElementById("dangky").addEventListener("click", function() {
    document.querySelector(".form.sign-in").classList.add("slide-left");
    document.querySelector(".form.sign-up").classList.add("active");
	document.querySelector(".form.sign-in").style.display = "none";
	document.querySelector(".form.sign-up").style.display = "block";
    setTimeout(function() {
        document.querySelector(".form.sign-in").classList.remove("active");
        document.querySelector(".form.sign-in").classList.remove("slide-left");
    }, 500); // Thời gian phải lớn hơn thời gian transition CSS
});

document.getElementById("dangnhap").addEventListener("click", function() {
    document.querySelector(".form.sign-up").classList.add("slide-right");
    document.querySelector(".form.sign-in").classList.add("active");
	document.querySelector(".form.sign-up").style.display = "none";
	document.querySelector(".form.sign-in").style.display = "block";
    setTimeout(function() {
        document.querySelector(".form.sign-up").classList.remove("active");
        document.querySelector(".form.sign-up").classList.remove("slide-right");
    }, 500); // Thời gian phải lớn hơn thời gian transition CSS
});












$(document).ready(function(){
    $('.nav-link.dropdown-toggle').hover(function(){
        $(this).find('.rotate-icon').addClass('hovered');
    }, function(){
        $(this).find('.rotate-icon').removeClass('hovered');
    });
});








