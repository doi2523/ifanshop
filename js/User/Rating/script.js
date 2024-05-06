document.addEventListener("DOMContentLoaded", function() {
    const bannerInner = document.querySelector(".card-banner-inner");
    const totalImages = document.querySelectorAll(".banner-image").length;
    let currentIndex = 0;
    const intervalTime = 3000;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        bannerInner.style.transition = "transform 0.5s ease-in-out";
        bannerInner.style.transform = `translateX(-${currentIndex * 100}%)`; // Thay đổi vị trí dựa trên tỉ lệ %
    }

    setInterval(nextSlide, intervalTime);
});
document.addEventListener("DOMContentLoaded", function() {
    const bannerInner = document.querySelector(".card-banner-inner-1");
    const totalImages = document.querySelectorAll(".banner-image-1").length;
    let currentIndex = 0;
    const intervalTime = 3000;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        bannerInner.style.transition = "transform 0.5s ease-in-out";
        bannerInner.style.transform = `translateX(-${currentIndex * 100}%)`; // Thay đổi vị trí dựa trên tỉ lệ %
    }

    setInterval(nextSlide, intervalTime);
});
// document.addEventListener("DOMContentLoaded", function() {
//     const banners = document.querySelectorAll(".card-banner");

//     banners.forEach(function(banner) {
//         const bannerInner = banner.querySelector(".card-banner-inner");
//         const totalImages = banner.querySelectorAll(".banner-image").length;
//         const imageWidth = banner.querySelector(".banner-image").offsetWidth;
//         let currentIndex = 0;
//         const intervalTime = 3000;

//         function nextSlide() {
//             currentIndex = (currentIndex + 1) % totalImages;
//             bannerInner.style.transition = "transform 0.5s ease";
//             bannerInner.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
//         }

//         setInterval(nextSlide, intervalTime);
//     });
// });
