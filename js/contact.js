function handleInput(input) {
    const span = input.nextElementSibling; // Lấy phần tử kế tiếp của input, trong trường hợp này là span
    if (input.value.trim() !== "") {
      span.classList.add("hide"); // Thêm lớp hide vào span nếu ô input có nội dung
    } else {
      span.classList.remove("hide"); // Loại bỏ lớp hide nếu ô input trống
    }
  }