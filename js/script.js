//  $(window).on("scroll",function () {

// 	var bodyScroll = $(window).scrollTop(),
// 	navbar = $(".navbar");
	
// 	if(bodyScroll > 50){
// 	$('.navbar-logo img').attr('src','images/ifa.png');
// 	navbar.addClass("nav-scroll");

// }else{
// 	$('.navbar-logo img').attr('src','images/ifa1.png');
// 	navbar.removeClass("nav-scroll");
// }

// });
// $(window).on("load",function (){
// 	var bodyScroll = $(window).scrollTop(),
// 	navbar = $(".navbar");
	
// 	if(bodyScroll > 50){
// 	$('.navbar-logo img').attr('src','images/ifa.png');
// 	navbar.addClass("nav-scroll");
// 	}else{
// 	$('.navbar-logo img').attr('src','images/ifa1.png');
// 	navbar.removeClass("nav-scroll");
// 	}

// 	$.scrollIt({
	
// 	easing: 'swing',      // the easing function for animation
// 	scrollTime: 900,       // how long (in ms) the animation takes
// 	activeClass: 'active', // class given to the active nav element
// 	onPageChange: null,    // function(pageIndex) that is called when page is changed
// 	topOffset: -63
// 	});
// });

// $(document).ready(function(){
//     $('.nav-item.dropdown').hover(function(){
//         $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
//     }, function(){
//         $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
//     });
// });
// $(document).ready(function(){
//     var isMenuOpen = false; // Biến đánh dấu trạng thái mở hay đóng của menu

//     // Sự kiện khi click vào mục menu
//     $('.nav-item.dropdown').click(function(e) {
//         e.stopPropagation(); // Ngăn chặn sự kiện click tự lan ra ngoài để không tắt menu ngay lập tức
//         if (!isMenuOpen) { // Nếu menu đang đóng
//             $(this).find('.dropdown-menu').stop(true, true).fadeIn(500); // Mở menu
//             isMenuOpen = true; // Cập nhật trạng thái là đã mở
//         } else { // Nếu menu đang mở
//             $(this).find('.dropdown-menu').stop(true, true).fadeOut(500); // Đóng menu
//             isMenuOpen = false; // Cập nhật trạng thái là đã đóng
//         }
//     });

//     // Sự kiện khi click ra khỏi mục menu
//     $(document).click(function(e) {
//         if (!$(e.target).closest('.nav-item.dropdown').length) { // Nếu click ra khỏi mục menu
//             if (isMenuOpen) { // Nếu menu đang mở
//                 $('.dropdown-menu').stop(true, true).fadeOut(500); // Đóng menu
//                 isMenuOpen = false; // Cập nhật trạng thái là đã đóng
//             }
//         }
//     });
// });

// const switchers = [...document.querySelectorAll(".switcher")];

// switchers.forEach((item) => {
//   item.addEventListener("click", function () {
//     switchers.forEach((item) =>
//       item.parentElement.classList.remove("is-active")
//     );
//     this.parentElement.classList.add("is-active");
//   });
// });



 // document.addEventListener("scroll", function() {
  //   iconClickBtn.style.display = "block";
  //   boxChat.classList.add("hide");
// });
// document.addEventListener("DOMContentLoaded", function() {
//   var cartClickBtn = document.getElementById("iconcartclick");
//   var cartChat = document.getElementById("boxcart");
//   var cartcloseBtn = document.getElementById("closecart");

//   cartClickBtn.addEventListener("click", function() {
//     cartClickBtn.style.display = "none";
//     cartChat.classList.remove("hide");
//   });

//   cartcloseBtn.addEventListener("click", function() {
//     cartClickBtn.style.display = "block";
//     cartChat.classList.add("hide");
//   });

//   document.addEventListener("mousedown", function(event) {
//     if (!cartChat.contains(event.target) && event.target !== cartClickBtn) {
//       cartClickBtn.style.display = "block";
//       cartChat.classList.add("hide");
//     }
//   });

 
// });
