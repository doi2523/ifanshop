$(".slider").each(function () {
  var $this = $(this);
  var $group = $this.find(".slide-group");
  var $slides = $this.find(".slide");
  var buttonArray = [];
  var currentIndex = 0;
  var timeout;

  function move(newIndex) {
    if ($group.is(":animated") || currentIndex === newIndex) {
      return;
    }

    buttonArray[currentIndex].removeClass("active");
    buttonArray[newIndex].addClass("active");

    var animateLeft, slideLeft;
    if (newIndex > currentIndex) {
      slideLeft = "100%";
      animateLeft = "-100%";
    } else {
      slideLeft = "-100%";
      animateLeft = "100%";
    }

    $slides.eq(newIndex).css({ left: slideLeft, display: "block" });

    $group.animate({ left: animateLeft }, function () {
      $slides.eq(currentIndex).css({ display: "none" });
      $slides.eq(newIndex).css({ left: 0 });
      $group.css({ left: 0 });
      currentIndex = newIndex;
      advance(); // Re-enable auto-advancing after slide transition
    });
  }

  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (currentIndex < $slides.length - 1) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 4000);
  }

  // $.each($slides, function (index) {
  //   var $button = $('<button type="button" class="slide-btn">&bull;</button>');
  //   if (index === currentIndex) {
  //     $button.addClass("active");
  //   }
  //   $button.on("click", function () {
  //     move(index);
  //   }).appendTo(".slide-buttons");
  //   buttonArray.push($button);
  // });

  $(".slide-buttons").empty();

  // Create new buttons
  var buttonArray = [];
  $slides.each(function (index) {
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
    $button.on("click", function () {
      move(index);
    });
    buttonArray.push($button);
  });

  // Append buttons to the slide-buttons container
  $(".slide-buttons").append(buttonArray);


  $(".slide-prev").on("click", function () {
    var newIndex = currentIndex === 0 ? $slides.length - 1 : currentIndex - 1;
    move(newIndex);
  });

  $(".slide-next").on("click", function () {
    var newIndex = currentIndex === $slides.length - 1 ? 0 : currentIndex + 1;
    move(newIndex);
  });

  advance();
});




// JavaScript
window.addEventListener('resize', function() {
  if (window.innerWidth <= 768) {
    document.getElementById('image1').src = 'images/313mb.png';
    document.getElementById('image2').src = 'images/314mb.png';
    document.getElementById('image3').src = 'images/315mb.png';
    document.getElementById('image4').src = 'images/313mb.png';
  } else {
    document.getElementById('image1').src = 'images/315dm.png';
    document.getElementById('image2').src = 'images/313dm.png';
    document.getElementById('image3').src = 'images/314dm.png';
    document.getElementById('image4').src = 'images/315dm.png';
  }
});

// Gọi hàm một lần để xác định hình ảnh ban đầu dựa trên kích thước màn hình hiện tại
window.dispatchEvent(new Event('resize'));




// Lấy tham chiếu tới nút "Thêm vào giỏ hàng"
var addToCartButton = document.getElementById("add-to-cart-button");
// Thêm sự kiện "click" cho nút "Thêm vào giỏ hàng"
addToCartButton.addEventListener("click", addToCart);
// Hàm xử lý khi nhấn vào nút "Thêm vào giỏ hàng"
function addToCart() {
    // Lấy thông tin sản phẩm từ các phần tử HTML
    var productName = document.getElementById("name-sanpham").textContent;
    var productPrice = document.getElementById("gia-uu-dai").textContent;
    var imageElement = document.getElementById('0022266_iphone-15-pro-max-256gb_240');
    var imageUrl = imageElement.getAttribute('src');
    // Tạo một đối tượng chứa thông tin sản phẩm
    var product = {
        name: productName,
        price: productPrice
    };
    // Thêm sản phẩm vào giỏ hàng (đây chỉ là một phần giả định)
    console.log("Đường dẫn của ảnh là: " + imageUrl);

    // Thông báo khi thêm sản phẩm thành công (có thể thay đổi tùy theo yêu cầu)
    alert("Sản phẩm " + productName + productPrice + " đã được thêm vào giỏ hàng.");
}
// Hàm giả lập việc thêm sản phẩm vào giỏ hàng
function addToCartFunction(product) {
    // Viết mã xử lý thêm sản phẩm vào giỏ hàng ở đây
    console.log("Thêm sản phẩm vào giỏ hàng:", product);
}
