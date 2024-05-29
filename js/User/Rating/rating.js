const stars = document.querySelectorAll(".rating > span");
stars.forEach((star) => {
  star.addEventListener("click", function () {
    const value = parseInt(this.getAttribute("data-value"));
    // Lưu giá trị vào Local Storage
    localStorage.setItem("ratingValue", value);
    resetStars();
    highlightStars(value);
    console.log(`Bạn đã chọn ${value} sao.`);
    // Xử lý logic tại đây, ví dụ: gửi giá trị đánh giá lên máy chủ.
  });
});
function resetStars() {
  stars.forEach((star) => {
    star.classList.remove("selected");
  });
}
function highlightStars(value) {
  for (let i = stars.length - 1; i >= stars.length - value; i--) {
    stars[i].classList.add("selected");
  }
}
